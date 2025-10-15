// app.js
import express from 'express';
import cors from 'cors';
import { setupMiddlewares } from './middlewares/index.js';
import { routeManagement } from './routes/index.js';

const app = express();

// -------------------------------------------------- CORS -------------------------------------------------------
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// ------------------------------------------------- Middlewares -------------------------------------------------
setupMiddlewares(app);

// -------------------------------------------------- Routes -----------------------------------------------------
routeManagement(app);

export default app;
