const bcrypt = require('bcrypt');
const express = require('express');
const Joi = require('@hapi/joi');
const passwordComplexity = require('joi-password-complexity');
const { User } = require('../models/user');

const router = express.Router();

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email(),
    password: passwordComplexity().required(),
  });
  return schema.validate(req);
}

// eslint-disable-next-line consistent-return
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Note - we don't indicate which failed
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password');

  // This will take care of checking the salt
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  // eslint-disable-next-line no-underscore-dangle
  const token = user.generateAuthToken();

  res.send(token);
});

module.exports = router;
