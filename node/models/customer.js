const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Customer = mongoose.model(
  'Customer',
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 32,
    },
    phone: {
      type: Number,
      required: true,
      min: 0,
    },
  }),
);

// Still can do validation on input from client
function validate(customer) {
  const schema = Joi.object({
    isGold: Joi.boolean(),
    name: Joi.string()
      .min(3)
      .max(32)
      .required(),
    phone: Joi.number()
      .min(0)
      .required(),
  });
  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validate;
