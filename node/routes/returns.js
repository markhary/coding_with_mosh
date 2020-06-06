// used by vidly.js
const express = require('express');
const Joi = require('@hapi/joi');
const { Movie } = require('../models/movie');
const { Rental } = require('../models/rental');

const auth = require('../middleware/auth');
const { validate } = require('../middleware/validate');

const router = express.Router();

function validator(req) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });
  return schema.validate(req.body);
}

// eslint-disable-next-line consistent-return
router.post('/', [auth, validate(validator)], async (req, res) => {
  const { customerId, movieId } = req.body;
  let rental = await Rental.lookup(customerId, movieId);

  if (!rental) return res.status(404).send(`No rental found for customer ${customerId} and movie ${movieId}`);
  if (rental.dateReturned) return res.status(400).send('Return already processed');
  rental.return();

  rental = await rental.save();
  await Movie.updateOne({ _id: movieId }, { $inc: { numberInStock: 1 } });
  res.send(rental);
});
module.exports = router;
