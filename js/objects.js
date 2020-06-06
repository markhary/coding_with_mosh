/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-object-spread */
/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-console */

// Factory function
function createCircle(radius) {
  return {
    radius,
    draw() {
      console.log(`draw radius ${radius}`);
    },
  };
}
const circle1 = createCircle(1);
const circle2 = createCircle(2);

circle1.draw();
circle2.draw();

console.log(circle1);
console.log(circle2);

// Constructor functions
function Circle(radius, location) {
  // These are public variables
  // Access public members as this.member
  this.radius = radius;
  this.location = location;
  this.isVisible = true;

  // These are private variables and functions
  // They are referenced without 'this'
  let defaultLocation = { x: 0, y: 0 };
  let computeOptimumLocation = (factor) => {};

  this.draw = function draw() {
    computeOptimumLocation(0.1);
    console.log(`Circle radius ${radius}`);
  };

  // Getters and Setters
  // Can also be done outside after object has been created
  // Specifically using defineProperty
  Object.defineProperty(this, 'defaultLocation', {
    get: () => defaultLocation,
    set: (value) => {
      if (!value.x || !value.y) throw new Error('Invalid location.');
      defaultLocation = value;
    },
  });
}

const circle = new Circle(3, { x: 2, y: 3 });
circle.draw();
console.log(circle);

// In JavaScript, functions are objects. They have properties and methods
console.log(`Circle.name: ${Circle.name}`);
console.log(`Circle.length: ${Circle.length}`);
console.log(`Circle.constructor: ${Circle.constructor}`);
// To call the Circle function
Circle.call({}, 1);
Circle.apply({}, [1]);
console.log(
  `Circle get defaultLocation: ${JSON.stringify(circle.defaultLocation)}`,
);
circle.defaultLocation = { x: 1, y: 1 };
console.log(
  `Circle get defaultLocation: ${JSON.stringify(circle.defaultLocation)}`,
);

// We can also add/remove properties
circle.location = {};
// eslint-disable-next-line dot-notation
circle['location'] = {};
delete circle.location;

//
// References in JS
// Primitives copied by value, objects copied by reference
//

// In this example, the primitives are copied by value
// number is unchanged
const number = 10;
function increase(num) {
  num += 1;
}
increase(number);
console.log(`Primitives passed by value: ${number}`);

// In this example, x is an object, so the values are passed by
// reference, and therefore changed.
const obj = { value: 10 };
function increaseObj(object) {
  object.value += 1;
}
increaseObj(obj);
console.log(`Objects passed by reference: ${obj.value}`);

//
// Enumerating properties of an object
//
for (let key in circle) console.log(key, circle[key]);
for (let key of Object.keys(circle)) console.log(key);
for (let entry of Object.entries(circle)) console.log(entry);
if ('radius' in circle) console.log('yes');
if ('color' in circle) console.log('yes');

//
// Cloning an object
// 1. Copy using keys
// 2. Copy using assign
// 3. Copy using spread operator (preferred over #2)
//
const another = {};
for (let key in circle) another[key] = circle[key];
const another2 = Object.assign({ color: 'yellow' }, circle);
const another3 = { ...circle }; // Preferred over Object.assign
console.log(another);
console.log(another2);
console.log(another3);

//
// Template literals
// Object {}
// Boolean true, false
// String '', ""
// Template ``
//
const templateLiteral = `This is my
  'first' message with a ${JSON.stringify(circle)} and ${2 + 3}`;
console.log(templateLiteral);

// Exercise - Stopwatch
function StopWatch() {
  // Private variables
  let STARTED = 'started';
  let STOPPED = 'stopped';
  let duration = 0;
  let startTime = 0;
  let state = STOPPED;

  this.start = function start() {
    if (state !== STOPPED) throw new Error('Function is already started');
    startTime = new Date();
    state = STARTED;
  };

  this.stop = function stop() {
    if (state !== STARTED) throw new Error('Function has not started');
    const date = new Date();
    duration = duration + date.getTime() - startTime;
    startTime = 0;
    state = STOPPED;
  };

  this.reset = function reset() {
    duration = 0;
    if (state === STARTED) {
      startTime = new Date();
    }
  };

  Object.defineProperty(this, 'duration', {
    get: () => {
      let value = duration;
      if (startTime) {
        let date = new Date();
        value = value + date.getTime() - startTime;
      }
      // Convert to ms
      return value / 1000;
    },
  });
}

const sw = new StopWatch();
console.log(`
  sw.start();  // Starts a timer, throw error if already started
  sw.reset();  // Resets timer back to 0
  sw.stop();   // Stops a timer, throw error if not started
  sw.duration; // Returns time counted. Initialized to 0.
`);
