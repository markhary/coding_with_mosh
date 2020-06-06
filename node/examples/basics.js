/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const path = require('path');
const os = require('os');
const fs = require('fs');
const http = require('http');

const Logger = require('./logger');

// Demonstration of a simple module
const logger = new Logger();

// Working with events
logger.on('log_event', (arg) => {
  console.log('Listener called');
});

// Every file is a module in node (including this one)
logger.log(module);

const pathObj = path.parse(__filename);
logger.log(pathObj);

// Working with OS calls
const totalmem = os.totalmem() / logger.GB;
logger.log(`totalmem: ${totalmem}`);

const freemem = os.freemem() / logger.GB;
logger.log(`freemem: ${freemem}`);

// Working with files - there are always sync and async method
const files = fs.readdirSync('./').filter((file) => file.endsWith('.md'));
console.log(files);

// Note this happens at some random point in time, whereas the synchronous method
// was called first
fs.readdir('./', (err, jsFiles) => {
  // eslint-disable-next-line no-unused-expressions
  err
    ? console.log(err)
    : console.log(jsFiles.filter((file) => file.endsWith('.js')));
});

// Http
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello, World');
    res.end();
  }

  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});
server.on('connection', (socket) => {
  console.log('New connection...');
});
server.listen(3000);
console.log('Listening on port 3000...');
