/* eslint-disable no-console */
const numbers = [3, 4];

numbers.push(5, 6); // Add to end
numbers.unshift(1, 2); // Add to front
numbers.splice(2, 0, 'a', 'b'); // Add somewhere in middle (index 2 here)

console.log(numbers);

//
// Finding primitives
//

const indexA = numbers.indexOf('a'); // Find an index
console.log(indexA);
numbers.push('a');
console.log(numbers.lastIndexOf('a')); // Find last occuring index of
console.log(numbers.includes('c')); // Something doesn't exist
console.log(numbers.includes('a')); // Something does exist

//
// Finding objects
//

const objects = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' },
  { id: 4, name: 'd' },
];

console.log(objects.includes({ id: 1, name: 'a' })); // Doesn't work on objects
const course = objects.findIndex((c) => c.name === 'c');
console.log(course);

// Empty an array
// numbers = []; // won't work for const
// Can also pop() until empty but that is inefficient
console.log(numbers);
numbers.length = 0; // A nice way
console.log(numbers);

// Concatenate an array
const first = [1, 2, 3];
const second = [4, 5, 6];
const combined = first.concat(second);
console.log(combined);

// Spread method
const combined2 = [...first, 'a', ...second];
// const copy = combined2.slice(); // slice copies array into another variable
const copy = [...combined2]; // cleaner way to do the above commented line
console.log(copy);

const joined = combined2.join(',');
console.log(joined);

// Sorting
combined2.sort();
console.log(combined2);
combined2.reverse();
console.log(combined2);

const courses = [
  { id: 1, name: 'node.js' },
  { id: 2, name: 'Javascript.js' },
  { id: 3, name: 'blatz' },
  { id: 4, name: '1920.23' },
];
courses.sort((a, b) => {
  // a < b => -1
  // a > b => 1
  // a === b => 0
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
});
console.log(courses);

// Test elements of an array
// every returns true if every element meets condition
// some returns true if at least one element meets condition
// Both return immediately upon appropriate condition
courses.push({ id: 5, name: 12345 });
console.log(courses);

const allStrings = courses.every((item) => typeof item.name === 'string');
const someStrings = courses.some((item) => typeof item.name === 'string');
console.log(`allStrings ${allStrings}`);
console.log(`someStrings ${someStrings}`);

// Filter out non-strings
const filtered = courses.filter((item) => typeof item.name === 'string');
console.log(filtered);

// Map each element to something else
const mapped = filtered.map(
  (item) => `<name id=${item.id}> ${item.name} </name>`,
);
console.log(mapped);

// The same as above, but using chaining instead
const chained = courses
  .filter((item) => typeof item.name === 'string')
  .map((item) => `<name id=${item.id}> ${item.name} </name>`);
console.log(chained);

// Reduce an array
const reduceMe = [1, 2, -1, 5, 6, -9];
const sum = reduceMe.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
);
console.log(`${reduceMe} => ${sum}`);

// Exercise 1: Create array from range
function arrayFromRange(a, b) {
  const array = [];
  for (let i = a; i <= b; i += 1) {
    array.push(i);
  }
  return array;
}
console.log(arrayFromRange(1, 4));
console.log(arrayFromRange(-4, 10));

// Exercise 6: Get Max

const maxArray = [1, -9, 12, 4, 6, 7, 17, -19, -99, 2, -3, -12, 5];
const max = maxArray.reduce((a, b) => (a > b ? a : b));
console.log(`max is ${max}`);

// Exercise 7: Movies
const movies = [
  { title: 'a', year: 2018, rating: 4.5 },
  { title: 'b', year: 2018, rating: 4.7 },
  { title: 'c', year: 2018, rating: 3 },
  { title: 'd', year: 2017, rating: 4.5 },
];

// All movies in 2018 with rating > 4
// Sort by their rating
// Descending order
// Pick their title
// Result should be 'b','a'
const rating = movies
  .filter((m) => m.year === 2018 && m.rating > 4)
  .sort((a, b) => b.rating > a.rating)
  .map((i) => i.title);
console.log(rating);
