/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
// Demonstrate how to make a module using the CommonJS pattern

const _radius = new WeakMap();

class Circle {
  constructor(radius) {
    _radius.set(this, radius);
  }

  draw() {
    console.log(`Circle with radius ${_radius.get(this)}`);
  }
}

// If exporting multiple classes
// module.exports.Circle = Circle;
// module.exports.Square = Square;

// If exporting a single class
module.exports = Circle;
