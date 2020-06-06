/* eslint-disable no-console */
const mongoose = require('mongoose');
const randomWords = require('random-words');

const categoryEnum = ['web', 'mobile', 'network'];

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
    // match: /pattern/
    // uppercase: true
  },
  category: {
    type: String,
    required: true,
    enum: categoryEnum,
    lowercase: true,
    trime: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: (v) => v && v.length > 0,
      message: 'A course should have at least one tag',
    },
  },
  instructors: {
    type: Array,
    validate: {
      // MAH - isAsync is deprecated in mongoose
      // isAsync: true,
      // validator: function validate(v, callback) {
      //   setTimeout(() => {
      //     // Do some async work
      //     const result = v && v.length > 0;
      //     callback(result);
      //   }, 40);
      //
      // Simple example of async with Promise
      // validator: (v) => Promise.resolve(v && v.length > 0),
      // message: 'There should be at least one instructor for the course',
      //
      // Example with an actual async function
      validator: (value) => {
        const promise = new Promise((resolve, reject) => {
          setTimeout(() => {
            const valid = value && value.length > 0;
            if (valid) {
              resolve();
            } else {
              reject(new Error('A course should have at least one tag.'));
            }
          }, 40);
        });
        return promise;
      },
      message: 'Instructor validation failed',
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function isRequired() {
      return this.isPublished;
    },
    min: 0,
    max: 200,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});
const Course = mongoose.model('Course', courseSchema);

async function connectDB() {
  console.log('Connecting to database...');
  await mongoose
    .connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 5000 })
    .then(() => {
      console.log('Connected to MongoDB... ');
    })
    .catch((err) => console.error('Error configuring connection to MongoDB...', err));

  await mongoose.connection.db
    .dropDatabase()
    .then(() => {
      console.log('Dropped existing courses... ');
    })
    .catch((err) => console.error('Error configuring connection to MongoDB...', err));
}

async function createCourse() {
  const course = new Course({
    name: 'Angular Course',
    // category: 'mobile',
    category: '-',
    author: 'Mosh',
    // tags: ['angular', 'frontend'],
    tags: null,
    instructors: ['Feynman'],
    isPublished: true,
    price: 15.8,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    // There is a better way to do this, look later
    // for (let key of Object.keys(ex.errors)) console.log(ex.errors[key].message);
    console.log(ex.message);
  }
}

async function populateCourse() {
  console.log('Populating database...');
  const results = [];
  // generate 100 random entries
  for (let i = 0; i < 100; i += 1) {
    const random = randomWords(5);
    const [name, author, ...tags] = random;
    const course = new Course({
      name,
      author,
      tags,
      category: categoryEnum[Math.floor(Math.random() * 3)],
      instructors: ['Einstein', 'Feynman'],
      isPublished: Math.random() < 0.5,
      price: Math.floor(Math.random() * 100),
    });

    results.push(course.save());
  }

  return Promise.all(results);
}

async function getCourses() {
  console.log('Listing all elements in database...');
  let courses = await Course.find();
  console.log(courses);

  console.log('Regular query:');
  courses = await Course.find({ author: /^[a-d].*/, isPublished: false })
    .limit(10)
    .sort({ name: -1 })
    .select({ tags: 1 });
  console.log(courses);

  console.log('Logical query:');
  courses = await Course.find().or([{ author: /^[e-g]/ }, { author: /^[e-g].*/ }]);
  console.log(courses);

  const count = await Course.find({ author: /^[e-h].*/, isPublished: true }).countDocuments();
  console.log(`Just counting ... ${count} courses found`);

  // Usually passed as query string parameters,
  // e.g. /api/courses?pageNumber=2&pageSize=10
  console.log('Paginating...');
  const pageNumber = 2;
  const pageSize = 10;
  courses = await Course.find({ isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, author: 1, tags: 1 });
  console.log(courses);
}

// eslint-disable-next-line camelcase
async function updateCourse_QueryFirst() {
  const findMe = await Course.findOne({ isPublished: false });
  const { id, author } = findMe;

  console.log('Before', findMe);

  // Approach: Query first
  // findById()
  // Modify its properties
  // save()
  console.log('Updating course with Query First method');
  const course = await Course.findById(id);
  if (!course) {
    console.log('  ... no courses found');
    return;
  }

  // course.idPublished = true;
  // course.author = '** UPDATE QUERY FIRST **'

  // Equivalent to above
  course.set({
    isPublished: true,
    author: `was '${author}' ** UPDATE QUERY FIRST **`,
  });

  const result = await course.save();
  console.log('Updating...', result);

  const findNew = await Course.findById(id);
  console.log('After', findNew);
}

// eslint-disable-next-line camelcase
async function updateCourse_UpdateFirst() {
  console.log('Updating course with Update First method');
  // Approach: Update first
  // Update direcly
  // Optionally: get the updated document

  const before = await Course.find({ isPublished: false }).countDocuments();
  console.log(`${before} unpublished courses found before update`);

  // Other methods: findByIDandUpdate
  await Course.updateMany(
    { isPublished: false },
    {
      $set: {
        isPublished: true,
      },
    },
  );

  const after = await Course.find({ isPublished: false }).countDocuments();
  console.log(`${after} unpublished courses found after update`);
}

async function removeCourses() {
  console.log('removing courses');
  // Remove all courses that cost more than limit
  const limit = 85;
  const filter = { price: { $gte: limit } };

  const before = await Course.find(filter).countDocuments();
  console.log(`${before} courses >= ${limit} found before deleting`);

  await Course.deleteMany(filter);

  const after = await Course.find(filter).countDocuments();
  console.log(`${after} courses >= ${limit} found after deleting`);
}

async function doWork() {
  console.log('== start ==');
  await connectDB();
  await createCourse();
  await populateCourse();
  await getCourses();
  await updateCourse_QueryFirst();
  await updateCourse_UpdateFirst();
  await removeCourses();
  console.log('== done ==');
}

doWork();
