const debug = require('debug')('app:middleware');

function method(req, res, next) {
  debug('Middleware method...');
  next();
}

module.exports = method;
