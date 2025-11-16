import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const generateToken = (userId) => {
  try {        
    return jwt.sign({ userId }, config.JWT_SECRET_KEY, { expiresIn: '1min' });
  } catch (error) {
    console.log("Error while generating TOKEN ID", error);
  }
};

// Generate refresh token
export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    config.JWT_REFRESH_SECRET_KEY,
    { expiresIn: "7d" } // long-lived
  );
};
