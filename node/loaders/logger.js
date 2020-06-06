/* eslint-disable object-curly-newline */
//
// https://stackoverflow.com/questions/47231677/how-to-log-full-stack-trace-with-winston-3
//
const { createLogger, format, transports } = require('winston');

require('winston-mongodb');
require('express-async-errors'); // Here because it is associated with logging errors

const logger = createLogger({
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
    format.colorize(),
    format.printf(({ level, message, timestamp, stack }) => {
      if (stack) {
        // print log trace
        return `${timestamp} ${level}: ${message} - ${stack}`;
      }
      return `${timestamp} ${level}: ${message}`;
    }),
  ),
  transports: [
    new transports.File({
      filename: 'logs/logfile.log',
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});

if (process.env.NODE_ENV !== 'test') {
  logger.add(
    new transports.MongoDB({
      db: 'mongodb://localhost/vidly',
      level: 'error',
      options: { useNewUrlParser: true, useUnifiedTopology: true },
      handleExceptions: true,
    }),
  );
}

if (process.env.NODE_ENV === 'development') {
  logger.add(new transports.Console({ handleExceptions: true }));
}

module.exports = logger;
