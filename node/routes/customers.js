// used by vidly.js
const express = require('express');
const { Customer, validate } = require('../models/customer.js');

const admin = require('../middleware/admin');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

// eslint-disable-next-line consistent-return
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send(`The customer with the given id ${req.params.id} was not found`);
  res.send(customer);
});

// eslint-disable-next-line consistent-return
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.create(req.body);
  res.send(customer);
});

// eslint-disable-next-line consistent-return
router.put('/:id', auth, async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!customer) return res.status(404).send(`The customer with the given id ${req.params.id} was not found`);
  res.send(customer);
});

// eslint-disable-next-line consistent-return
router.delete('/:id', [auth, admin], async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) return res.status(404).send(`The customer with the given id ${req.params.id} was not found`);
  res.send(customer);
});

module.exports = router;
