/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/playground', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 5000,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

// eslint-disable-next-line no-unused-vars
const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model(
  'Course',
  new mongoose.Schema({
    name: String,
    author: authorSchema,
  }),
);

// eslint-disable-next-line no-unused-vars
async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

// eslint-disable-next-line no-unused-vars
async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

// eslint-disable-next-line no-unused-vars
async function updateAuthor(courseId) {
  const course = await Course.findById(courseId);
  course.author.name = 'Mosh Hamedani';
  course.save();
}

// createCourse('Node Course', new Author({ name: 'Mosh' }));
updateAuthor('5ebcf264dab30e59728f0175');
