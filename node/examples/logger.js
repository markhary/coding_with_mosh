/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

const debug = require('debug')('app:logger');

const EventEmitter = require('events');

class Logger extends EventEmitter {
  constructor() {
    super();

    this.KB = 1024;
    this.MB = 1048576;
    this.GB = 1073741824;
  }

  log(message) {
    debug(message);
    this.emit('log_event');
  }
}

module.exports = Logger;
