const config = require('config');

module.exports = function initialize() {
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
  }
};
