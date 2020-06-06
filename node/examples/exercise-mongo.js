/* eslint-disable no-console */
console.log('*** Make sure you have imported the example file into MongoDB');

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});
const Course = mongoose.model('Course', courseSchema);

mongoose
  .connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 5000 })
  .then(() => {
    console.log('Connected to MongoDB... ');
  })
  .catch((err) => console.error('Error configuring connection to MongoDB...', err));

async function doExercise1() {
  // Find published backend courses, sort by name, return name and author
  return Course.find({ tags: 'backend', isPublished: true })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}

async function doExercise2() {
  // Select published courses that have either 'frontend' or 'backend' tags
  // Sort in decending order by price, select only name and author
  return Course.find({ isPublished: true })
    .or([{ tags: 'backend' }, { tags: 'frontend' }])
    .sort({ price: -1 })
    .select({ name: 1, author: 1 });

  // Can also do it this way
  // return Course.find({ isPublished: true, tags: { $in: ['frontend', 'backend'] } })
  //   .sort({ price: -1 })
  //   .select({ name: 1, author: 1 });
}

async function doExercise3() {
  // Select all published courses that are $15 or greater, or have 'by' in their title
  return Course.find({ isPublished: 1 }).or([{ price: { $gte: 15 } }, { name: /by/i }]);
}

async function run() {
  console.log('Exercise 1...');
  let courses = await doExercise1();
  console.log(courses);

  console.log('Exercise 2...');
  courses = await doExercise2();
  console.log(courses);

  console.log('Exercise 3...');
  courses = await doExercise3();
  console.log(courses);
}

run();
