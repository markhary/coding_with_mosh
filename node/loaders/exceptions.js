require('express-async-errors'); // Here because it is associated with logging errors

module.exports = function initialize() {
  process.on('unhandledRejection', (err) => {
    // logger.error('UNHANDLED REJECTION: ', err);
    // Use this with winston.handleExceptions
    throw err;
  });
};
