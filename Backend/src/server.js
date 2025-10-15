import app from './app.js';
import config from './config/config.js';
import { connectToDatabase } from './database/mongo-connection.js';

const PORT = config.port || 3000;

let server
// THE INITAL ENTRY POINT FOR THE ENTIRE SERVER
(async () => {
  try {
    await connectToDatabase()
    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}
)()


// Handle uncaught exceptions (synchronous errors)
process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  console.error(err.stack);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  console.error(err.stack);
  server.close(() => {
    process.exit(1);
  });
});
