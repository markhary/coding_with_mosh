//
// The backend for the Vidly genres service
//

const config = require('config');
const express = require('express');

const app = express();

const logger = require('./loaders/logger');
require('./loaders/exceptions')();
require('./loaders/config')();
require('./loaders/database')();
require('./loaders/routes')(app);
require('./loaders/validation')();
require('./loaders/prod')(app);

//
// Server code below
//
const port = config.get('port');
const server = app.listen(port, () => logger.info(`Listening on port ${port}...`));

server.on('error', (err) => {
  logger.error(err);
  logger.error('ERROR --> Most likely port already in use');
  process.exit(1);
});

logger.info("Need help? Try $> VIDLY_JWT_PRIVATE_KEY='12345' nodemon");

module.exports = server;
