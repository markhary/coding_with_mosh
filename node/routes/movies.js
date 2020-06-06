/* eslint-disable no-underscore-dangle */
// used by vidly.js
const express = require('express');
const { Movie, validate } = require('../models/movie.js');
const { Genre } = require('../models/genre.js');

const admin = require('../middleware/admin');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) res.status(404).send(`The movie with the given id ${req.params.id} was not found`);
  res.send(movie);
});

// eslint-disable-next-line consistent-return
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre');

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  movie = await movie.save();
  res.send(movie);
});

// eslint-disable-next-line consistent-return
router.put('/:id', auth, async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!movie) res.status(404).send(`The movie with the given id ${req.params.id} was not found`);
  res.send(movie);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) res.status(404).send(`The movie with the given id ${req.params.id} was not found`);
  res.send(movie);
});

module.exports = router;
