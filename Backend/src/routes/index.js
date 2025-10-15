import authRoutes from './auth.route.js';

export const routeManagement = (app) => {
  app.use('/api/auth', authRoutes);

  // Catch-all 404 - Match all routes that weren't matched earlier
  app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

};
