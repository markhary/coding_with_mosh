const config = require('config');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const passwordComplexity = require('joi-password-complexity');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function generateAuthToken() {
  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
};

const User = mongoose.model('User', userSchema);

// This is how to validate objectIDs
function validate(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().email(),
    password: passwordComplexity().required(),
    isAdmin: Joi.boolean(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validate;
