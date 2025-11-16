// middlewares/auth.js
import jwt from 'jsonwebtoken';
import config from '../../config/config.js';
import { User } from '../../models/userModel.js'

import { generateToken } from '../../utils/tokenGeneration.js';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const accessToken = authHeader.split(' ')[1];

  try {
    // Try to verify access token
    const decoded = jwt.verify(accessToken, config.JWT_SECRET_KEY);
    req.user = decoded;
    return next();
  } catch (err) {
    // If access token expired
    if (err.name === 'TokenExpiredError') {
      try {        
        // Check refresh token (client should send refresh token in headers or cookie)
        const refreshToken = req.headers['x-refresh-token'] || req.cookies?.refreshToken;
        if (!refreshToken) {
          return res.status(401).json({ error: 'No refresh token provided' });
        }

        const decodedRefresh = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET_KEY);

        // Check if refresh token is valid in DB
        const user = await User.findById(decodedRefresh.id);        
        if (!user || user.refreshToken !== refreshToken) {
          return res.status(403).json({ error: 'Invalid refresh token' });
        }

        // Generate new access token
        const newAccessToken = generateToken(user);

        // Optionally, attach new token to response header for client to use

        // Attach user info and continue
        req.user = { id: user.id, email: user.email, accessToken : newAccessToken };
        return next();
      } catch (refreshErr) {
        return res.status(403).json({ error: 'Refresh token expired or invalid' });
      }
    }

    // Any other token error
    return res.status(403).json({ error: 'Forbidden: Invalid token' });
  }
};
