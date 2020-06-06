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

const Author = mongoose.model(
  'Author',
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
  }),
);

const Course = mongoose.model(
  'Course',
  new mongoose.Schema({
    name: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
    },
  }),
);

// eslint-disable-next-line no-unused-vars
async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });

  const result = await author.save();
  console.log(result);
}

// eslint-disable-next-line no-unused-vars
async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

// An example of a hybrid approach between
// normalization (consistency) and denormalization (performance)
// eslint-disable-next-line no-unused-vars
async function listCourses() {
  const courses = await Course.find()
    .populate('author', 'name -_id')
    .populate('category', 'name')
    .select('name author');
  console.log(courses);
}

// createAuthor('Mosh', 'My bio', 'My Website');

// Object ID has to be in proper format
// createCourse('Node Course', '5ebcec2b62bea3578d154fe1');

listCourses();
