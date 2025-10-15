import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const generateToken = (userId) => {
  try {        
    return jwt.sign({ userId }, config.JWT_SECRET_KEY, { expiresIn: '4h' });
  } catch (error) {
    console.log("Error while generating TOKEN ID", error);
  }
};
