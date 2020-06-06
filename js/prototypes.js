/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-prototype-builtins */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */

const obj = {};

// Every object (except the root object) has a prototype (parent).
// To get the prototype of an object:
Object.getPrototypeOf(obj);

// In Chrome, you can inspect "__proto__" property. But you should
// not use that in the code.

// To get the attributes of a property:
Object.getOwnPropertyDescriptor(obj, 'propertyName');

// To set the attributes for a property:
Object.defineProperty(obj, 'propertyName', {
  configurable: false, // cannot be deleted
  writable: false,
  enumerable: false,
});

// Constructors have a "prototype" property. It returns the object
// that will be used as the prototype for objects created by the constructor.
Object.prototype === Object.getPrototypeOf({}); // true
Array.prototype === Object.getPrototypeOf([]); // true

// All objects created with the same constructor will have the same prototype.
// A single instance of this prototype will be stored in the memory.
const x = {};
const y = {};
Object.getPrototypeOf(x) === Object.getPrototypeOf(y); // returns true

//
// Basics of prototypes
//

function Circle(radius) {
  // Instance member
  this.radius = radius;

  this.move = function move(r) {
    console.log(`move: ${r}`);
  };

  // Each object will have its own copy of draw. Instead, add it as part of
  // prototype so we save in memory
  //  this.draw = () => {
  //    console.log('draw');
  //  };
}

// Prototype member
Circle.prototype.draw = function draw() {
  console.log('draw');
  this.move(this.radius);
};

// Override standard prototype method
Circle.prototype.toString = function toString() {
  console.log(`Circle: 
    radius: ${this.radius}
  `);
};

const c1 = new Circle(1);
const c2 = new Circle(2);

console.log(Object.keys(c1)); // Look at instance properties
for (const key in c1) console.log(key); // Look at instance + prototype properties
console.log(c1.hasOwnProperty('draw'));
console.log(c1.hasOwnProperty('move'));
