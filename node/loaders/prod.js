const compression = require('compression');
const helmet = require('helmet');

module.exports = function initialize(app) {
  app.use(helmet());
  app.use(compression());
};
