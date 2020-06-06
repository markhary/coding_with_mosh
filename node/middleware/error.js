const logger = require('../loaders/logger');

// eslint-disable-next-line consistent-return
module.exports = function error(err, req, res, next) {
  if (err) {
    logger.error(err);
    return res.status(500).send('Internal server error - contact administrator');
  }
  next();
};
