//
// NOT USED BY VIDLY
//
// Used by express.js
const express = require('express');

const router = express.Router();

function homePage(req, res) {
  res.render('index', { title: 'My Express App', message: 'Hello, World' });
}

router.route('/').get(homePage);

module.exports = router;
