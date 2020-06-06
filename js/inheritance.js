/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

// Note to self:
// Avoid multiple layers of inheritance - one level only
// If multiple levels, then use composition.  Or,
// "Favor Composition over Inheritance"

function Shape(color) {
  this.color = color;
}

Shape.prototype.duplicate = function duplicate() {
  console.log('duplicate');
};

function Circle(radius, color) {
  // Calling the super constructor (parent constructor)
  Shape.call(this, color);
  this.radius = radius;
}

// Another good practice, use extend() or similar instead of copying the
// prototype.constructor and prototype= lines
function extend(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Circle;
}

// Prototypical inheritance. It is best practice to reset prototype constructor
// as well, except use extend()
// Circle.prototype = Object.create(Shape.prototype);
// Circle.prototype.constructor = Circle;
extend(Circle, Shape);

Circle.prototype.draw = function draw() {
  console.log('draw');
};

const shape = new Shape('green');
const circle = new Circle(1, 'red');

// c.duplicate() and c.draw() exist
console.log(shape);
console.log(circle);

// Override method.  Done after extend() for the object
Circle.prototype.duplicate = function duplicate() {
  // Calling duplicate on parent
  Shape.prototype.duplicate.call(this);
  console.log('duplicate circle');
};

// Polymorphism
function Square(size) {
  this.size = size;
}
// Square.prototype = Object.create(Shape.prototype);
// Square.prototype.constructor = Circle;
extend(Square, Shape);

Square.prototype.duplicate = function duplicate() {
  // Calling duplicate on parent
  Shape.prototype.duplicate.call(this);
  console.log('duplicate square');
};

const square = new Square(1, 'blue');
console.log(square);

// How polymorphism works
const shapes = [new Circle(), new Square()];
// eslint-disable-next-line no-restricted-syntax
for (const s of shapes) s.duplicate();

// Composition over inheritance
const canEat = {
  eat: function eat() {
    console.log('eating');
  },
};

const canWalk = {
  walk: function walk() {
    console.log('walking');
  },
};

const canSwim = {
  swim: function swim() {
    console.log('swimming');
  },
};

function Person(name) {
  this.name = name;
}

function Goldfish() {}

function Duck() {}

// This is composition
// Object.assign(Person.prototype, canEat, canWalk);
// Object.assign(Goldfish.prototype, canEat, canSwim);
// Object.assign(Duck.prototype, canEat, canWalk, canSwim);
//
// This is suggested as a cleaner way to do this instead of Object.assign()
function compose(target, ...sources) {
  Object.assign(target, ...sources);
}
compose(Person.prototype, canEat, canWalk);
compose(Goldfish.prototype, canEat, canSwim);
compose(Duck.prototype, canEat, canWalk, canSwim);

const person = new Person('Bob');
const duck = new Duck();
const goldfish = new Goldfish();

console.log(person);
console.log(duck);
console.log(goldfish);

//
// Exercise - Prototypical Inheritance
// Pre-ES6 method
//
// Two objects: HtmlElement, HtmlSelectElement
// HtmlElement: click()
//  -- proto - focus()
//  consructor - HtmlElement()
// HtmlSelectElement([optional])  // empty array if not passed
//   addItem(item)
//   items: []
//   removeItem()
//   -- proto - HtmlElement -- set prototype on instance, not function
function HtmlElement() {
  this.click = function click() {
    console.log('clicked');
  };
  this.render = function render() {
    console.log('default render');
  };
}

HtmlElement.prototype.focus = function focus() {
  console.log('focused');
};

function HtmlSelectElement(items = []) {
  this.items = items;
  this.addItem = function addItem(item) {
    this.items.push(item);
  };
  this.removeItem = function removeItem(val) {
    this.items = this.items.filter((item) => item !== val);
  };
}

// We want HtmlSelectElement to inherit the properties from HtmlElement
HtmlSelectElement.prototype = new HtmlElement();
HtmlSelectElement.prototype.constructor = HTMLSelectElement;

const h1 = new HtmlElement();
const h2 = new HtmlSelectElement();
const h3 = new HtmlSelectElement(['a', 1, true]);

console.log(h1);
console.log(h2);
console.log(h3);

//
// Exercise - Polymorphism
//
// HtmlSelectElement method render
// HtmlImageElement has own render
HtmlSelectElement.prototype.render = function render() {
  let message = '';
  message += '<select>\n';
  message += this.items.map((item) => `<option>${item}</option>`).join('\n');
  message += '</select>';
  return message;
};

function HtmlImageElement(src = '') {
  this.src = src;
  this.render = function render() {
    return `<imt src="${src}" />`;
  };
}

// We want HtmlSelectElement to inherit the properties from HtmlElement
HtmlImageElement.prototype = new HtmlElement();
HtmlImageElement.prototype.constructor = HtmlImageElement;
const img = new HtmlImageElement('https://this.is.me');
const h4 = new HtmlSelectElement([1, 2, 3]);

// test the polymorphism
const elements = [
  new HtmlSelectElement(['a', 'b', 'c']),
  new HtmlImageElement('http//water.boy'),
];
for (const element of elements) console.log(element.render());
