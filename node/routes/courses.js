//
// NOT USED BY VIDLY
//
// Used by express.js
const express = require('express');
const Joi = require('@hapi/joi');

const router = express.Router();

const courses = [
  { id: 1, name: 'course 1' },
  { id: 2, name: 'course 2' },
  { id: 3, name: 'course 3' },
];

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

// HTTP GET REQUESTS
function getAll(req, res) {
  res.send(JSON.stringify(courses));
}

// Retrieve a course
function get(req, res) {
  const course = courses.find((c) => c.id === parseInt(req.params.id, 10));
  if (!course) return res.status(404).send('The course with the given ID was not found');
  return res.send(course);
}

// HTTP POST REQUESTS -- Create a new course
function create(req, res) {
  const { error, value } = validateCourse(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: value.name,
  };
  courses.push(course);
  res.send(course); // Always return the created object in the body of the response
}

// HTTP PUT REQUESTS - Update a course
function update(req, res) {
  // Look up course, return 404 if not exist
  const course = courses.find((c) => c.id === parseInt(req.params.id, 10));
  if (!course) return res.status(404).send('The course with the given ID was not found');

  // Validate input
  const { error, value } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Update and return object
  course.name = value.name;
  return res.send(course);
}

// HTTP DELETE REQUEST - Delete a course
function remove(req, res) {
  // Look up the course
  // Not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id, 10));
  if (!course) return res.status(404).send('The course with the given ID was not found');

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  return res.send(course);
}

router.route('/').get(getAll).post(create);

router.route('/:id').get(get).put(update).delete(remove);

module.exports = router;
