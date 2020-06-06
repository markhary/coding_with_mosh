const express = require('express');

const router = express.Router();

// eslint-disable-next-line consistent-return
// eslint-disable-next-line no-unused-vars
router.get('/', async (req, res) => {
  if (req.query.type === 'p') {
    Promise.reject(new Error('Testing uncaught rejection'));
    res.status(500).send('Testing uncaught rejection');
  } else throw new Error('Testing uncaught exception');
});

module.exports = router;
