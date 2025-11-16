// config/config.js
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the root directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });


dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
  DBURI: process.env.DBURI
  // Add more config options here, like DB URI, JWT secret, etc.
};

// console.log(config);  // -- for debug
export default config;

