const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { GenreSchema } = require('./genre.js');

const Movie = mongoose.model(
  'Movie',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 255,
    },
    genre: GenreSchema,
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
  }),
);

// Still can do validation on input from client
function validate(genre) {
  const schema = Joi.object({
    title: Joi.string()
      .min(1)
      .max(255)
      .required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required(),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required(),
  });

  return schema.validate(genre);
}

exports.Movie = Movie;
exports.validate = validate;
