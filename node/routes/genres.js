/* eslint-disable consistent-return */
/* eslint-disable no-console */
// used by vidly.js
const express = require('express');
const { Genre, validate } = require('../models/genre');

const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const { validateObjectId } = require('../middleware/validate');

const router = express.Router();

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send(`The genre with the given id ${req.params.id} was not found`);
  res.send(genre);
});

router.put('/:id', [auth, validateObjectId], async (req, res) => {
  const update = { name: req.body.name };
  const genre = await Genre.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!genre) return res.status(404).send(`The genre with the given id ${req.params.id} was not found`);
  res.send(genre);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) return res.status(404).send(`The genre with the given id ${req.params.id} was not found`);
  res.send(genre);
});

module.exports = router;
