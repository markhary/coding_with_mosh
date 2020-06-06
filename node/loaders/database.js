const config = require('config');
const mongoose = require('mongoose');

const logger = require('./logger');

module.exports = function initialize() {
  const db = config.get('database');
  mongoose
    .connect(db.server, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 100,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => logger.info(`Connected to ${db.server}`));
  // No catch so that the exception handlers catch it
};
