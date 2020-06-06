/* eslint-disable no-console */

//
// The rest operator
// Looks like spread operator but is different
//
function sum(...args) {
  return args.reduce((a, b) => a + b);
}

console.log(sum(1, 2, 3, 4, 5));

// Getters and setters
const person = {
  firstName: 'Mark',
  lastName: 'Hary',
  get fullName() {
    return `${person.firstName} ${person.lastName}`;
  },
  set fullName(name) {
    const names = name.split(' ');
    [this.firstName, this.lastName] = names;
  },
};
console.log(person.fullName);

person.fullName = 'Bo Jangles';
console.log(person);

// this:
// method -> obj
// function -> global

const example = {
  video: 'Snarkles',
  play() {
    console.log(this);
  },
};
example.play();

function showMe() {
  console.log(this);
}
showMe(); // Part of the global window object, don't do it

function Video(title) {
  this.title = title;
  console.log(this); // the video object
}
const video = new Video('Jaws'); // this is a Video object
console.log(video); // same video object

const videos = {
  title: 'star',
  tags: ['a', 'b', 'c'],
  showTags() {
    this.tags.forEach((tag) => console.log(this.title, tag));
  },
};

videos.showTags();
console.log(videos);

// Exercise 1 - Sum of arguments
// sum[1, 2, 3, 4] => 10
// Use Array.isArray()
function sumArgs(...args) {
  // eslint-disable-next-line no-param-reassign
  if (Array.isArray(args[0])) args = [...args[0]];
  return args.reduce((a, b) => a + b);
}

console.log(sumArgs(1, 2, 3, 4));
console.log(sumArgs([1, 2, 3, 4]));

// Exercise 2 - Area of Circle
// circle.radios = 2
// circle.area = 20 (read only)
const circle = {
  radius: 2,
  get area() {
    return Math.PI * this.radius ** 2;
  },
};
console.log(circle.area);

// Exercise 3 - Error Handling
function countOccurrences(array, searchElement) {
  if (!Array.isArray(array)) throw new Error('Not an array');
  return array.reduce((accumulator, current) => {
    const occurrence = current === searchElement ? 1 : 0;
    return accumulator + occurrence;
  }, 0);
}

const numbers = [1, 2, 3, 4];
const count = countOccurrences(numbers, 1);
console.log(count);

try {
  const vNumber = countOccurrences(1, 1);
  console.log(vNumber);
} catch (e) {
  console.log(`vNumber: ${e}`);
}

try {
  const vBool = countOccurrences(true, 1);
  console.log(vBool);
} catch (e) {
  console.log(`vBool: ${e}`);
}

try {
  const vNull = countOccurrences(null, 1);
  console.log(vNull);
} catch (e) {
  console.log(`vNull: ${e}`);
}

try {
  const vUndefined = countOccurrences(undefined, 1);
  console.log(vUndefined);
} catch (e) {
  console.log(`vUndefined: ${e}`);
}
