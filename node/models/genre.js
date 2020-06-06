const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Genre = mongoose.model('Genre', GenreSchema);

// Still can do validation on input from client
function validate(genre) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(genre);
}

exports.Genre = Genre;
exports.validate = validate;
exports.GenreSchema = GenreSchema;
