/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
// Demonstrate how to make a module using the ES6 pattern

const _radius = new WeakMap();

export default class Circle {
  constructor(radius) {
    _radius.set(this, radius);
  }

  draw() {
    console.log(`Circle with radius ${_radius.get(this)}`);
  }
}
