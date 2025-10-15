// middlewares/logger.js
import chalk from 'chalk';

export const loggerMiddleware = (req, res, next) => {
  const start = process.hrtime();

  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const durationInMs = (seconds * 1e3 + nanoseconds / 1e6).toFixed(2);

    const method = chalk.blue(req.method);
    const url = chalk.green(req.originalUrl);
    const status = res.statusCode < 400 ? chalk.green(res.statusCode) : chalk.red(res.statusCode);
    const time = chalk.yellow(`${durationInMs}ms`);

    console.log(`[${new Date().toISOString()}] ${method} ${url} ${status} - ${time}`);
  });

  next();
};
