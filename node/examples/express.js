/* eslint-disable no-console */

// Packages
const debug = require('debug')('app:express');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const courses = require('./routes/courses');
const home = require('./routes/home');

// Application modules
const middleware = require('./middleware/middleware');

const app = express();
app.set('view engine', 'pug');
app.set('views', './views'); // This is the default so not strictly necessary

app.use(express.json());
app.use(helmet()); // Enable parsing of json in request bodies
app.use(express.urlencoded({ extended: true })); // If we have URL endcoded data

console.log('If you are not seeting what you expect, try:');
console.log('DEBUG=app* nodemon express');

// Configuration
debug(`------ ${config.get('name')} -----`);
if (!config.has('db.password')) {
  console.log('Environment variable required.  Try:');
  console.log('APP_DB_PASSWORD="12345" DEBUG=app* nodemon express');
  process.exit(9);
}

// app.get('env') returns 'development'
// if NODE_ENV is not defined (process.env.NODE_ENV)
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...');
}

// Serve up static resources
app.use(express.static('public'));

// Custom middleware
app.use(middleware);

// Just a test API to show how things are done
app.get('/api/post/:id/why/:name', (req, res) => {
  res.send([req.params, req.query]);
});

// And finally, attach the routes
app.use('/', home);
app.use('/api/courses', courses);

//
// Server code below
//
const port = config.get('port');
app.listen(port, () => debug(`Listening on port ${port}...`));

// Some sample commands
debug(
  [
    '',
    '',
    '---------- Test using browser ---------',
    `http://localhost:${port}/`,
    `http://localhost:${port}/api/courses`,
    `http://localhost:${port}/api/courses/1`,
    `http://localhost:${port}/api/post/1234/why/mark?sortBy=this&animal=dog`,
    '---------------------------------------',
    '',
  ].join('\n'),
);
