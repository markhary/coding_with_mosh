const express = require('express');

const errorHandler = require('../middleware/error');
const auth = require('../routes/auth');
const customers = require('../routes/customers');
const errors = require('../routes/errors');
const genres = require('../routes/genres');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const returns = require('../routes/returns');
const users = require('../routes/users');

module.exports = function initialize(app) {
  // Attach the various routes used in the application
  app.use(express.json()); // Parse JSON body

  app.use('/api/customers', customers);
  app.use('/api/errors', errors);
  app.use('/api/genres', genres);
  app.use('/api/movies', movies);
  app.use('/api/rentals', rentals);
  app.use('/api/returns', returns);
  app.use('/api/users', users);
  app.use('/api/auth', auth);

  app.use(errorHandler);

  // handle malformed JSON
  // eslint-disable-next-line consistent-return
  app.use((err, req, res, next) => {
    if (err) return res.status(400).send(err);
    next();
  });
};
