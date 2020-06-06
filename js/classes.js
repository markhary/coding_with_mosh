/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

// Hoisting
// Function declarations are raised to top of code
// e.g. function hello() {} // goes to top of code
// const goodbye = function() {}; // stays where it is

// Function declarations are hoisted
hello();
function hello() {
  console.log('hello');
}

// Function expressions are not hoisted
try {
  goodbye();
  const goodbye = function goodbye() {};
} catch (error) {
  console.log("Can't call function expression before it is defined");
}

// Class declarations (and class expressions) are not hoisted
// Don't do this: const Circle = class Circle{};

// Inheritance
class Shape {
  constructor() {
    console.log('Super class Shape');
  }

  describe() {
    console.log('this is a shape');
  }

  override() {
    throw new Error('Shape expects this to be overriden');
  }
}

// Private variables and methods using the Symbol() pattern
// Every call to Symbol() gives a unique value
const _radius = Symbol('Private radius using Symbol()');
const _draw = Symbol('Private method using Symbol()');

// Private variables and methods using the WeakMap() pattern
// Using separate WeakMap for each private member is personal preference
const _color = new WeakMap();
const _move = new WeakMap();

// Our class definition
class Circle extends Shape {
  constructor(radius, name = 'bongo', color = 'red') {
    // Have to call parent object constructor if defined
    super();
    this.name = name; // A public variable
    this[_radius] = radius; // A private variable using Symbol()
    _color.set(this, color); // A private variable using WeakMap()

    // Public methods in the instance
    this.move = function move() {
      // Calling the private move method. Note that _move.get(this)
      // returns a function, so _move.(this)() executes the function
      _move.get(this)();
      console.log('public move');
    };

    // Private method using WeakMap() pattern
    // Use => method otherwise this will not be bound to object
    // If _move.set(this, function() {console.log(this)}) , this is undefined
    _move.set(this, () => {
      console.log(`private move: ${radius}`, this);
    });
  }

  // Public method
  draw() {
    this[_draw](); // calling a private method from Symbol() pattern
    console.log(
      `public - drawing ${this.name}: ${this[_radius]} & ${_color.get(this)}`,
    );
  }

  override() {
    console.log('Overriding the Shape.override()');
  }

  // Getter for Symbol() pattern
  get radius() {
    return this[_radius];
  }

  // Getter for WeakMap() pattern
  get color() {
    return _color.get(this);
  }

  // Setter for Symbol() pattern
  set radius(value) {
    if (value <= 0 || typeof value !== 'number') {
      throw new Error('invalid radius');
    }
    this[_radius] = value;
  }

  // Setter for WeakMap() pattern
  set color(value) {
    if (typeof value !== 'string') throw new Error('invalid color');
    _color.set(this, value);
  }

  // Private method using Symbol() pattern
  [_draw]() {
    console.log(
      `private - drawing ${this.name}: ${this[_radius]} & ${_color.get(this)}`,
    );
  }

  // Static method
  static parse(str) {
    // eslint-disable-next-line prefer-destructuring
    const radius = JSON.parse(str).radius;
    return new Circle(radius);
  }
}

const c = new Circle(5);
const c1 = Circle.parse('{"radius":1}');
console.log(c);
console.log(c1);

// Exercise - Implement a stack
const _items = new WeakMap();
class Stack {
  constructor() {
    _items.set(this, []);
  }

  get count() {
    return _items.get(this).length;
  }

  push(item) {
    _items.get(this).push(item);
  }

  pop() {
    if (this.count === 0) throw new Error('PASS: Stack is empty');
    return _items.get(this).pop();
  }

  peek() {
    if (this.count === 0) throw new Error('PASS: Stack is empty');
    return _items.get(this)[this.count - 1];
  }
}

const stack = new Stack();
stack.push('a');
stack.push('b');
stack.push('c');
console.log(`stack has ${stack.count} objects`);
stack.pop();
console.log(`${stack.peek()} is next on stack`);
stack.pop();
stack.pop();
console.log(`stack has ${stack.count} objects`);
try {
  stack.pop();
  throw new Error('FAIL');
} catch (error) {
  console.log(`pop(): ${error}`);
}
try {
  stack.peek();
  throw new Error('FAIL');
} catch (error) {
  console.log(`peek(): ${error}`);
}
