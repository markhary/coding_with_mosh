/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
const x = 1;
const one = '1';

console.log(x === one);
// eslint-disable-next-line eqeqeq
console.log(x == one);

// ternary
const points = 110;
const type = points > 100 ? 'gold' : 'silver';
console.log(`This customer is ${type} (${points} points)`);

const userColor = undefined;
const defaultColor = 'blue';

// Great way to set defaults
const currentColor = userColor || defaultColor;
console.log(currentColor);

// swap two variables
let a = 1;
let b = 2;
console.log(a, b);

// nice and easy swap mechanism
[a, b] = [b, a];
console.log(a, b);

// Object (basic)
const person = {
  name: 'Mark',
  age: 45,
};

// Testing the for in loop
// This is done properly and only iterates on non-inherited properties
for (const key in person) {
  if ({}.hasOwnProperty.call(person, key)) {
    console.log(key, person[key]);
  }
}

const fruits = ['apple', 'banana', 'kiwi'];
for (const fruit of fruits) {
  console.log(fruit);
}

// calculate primes example
function findPrimes(limit) {
  let candidates = [];
  let remainingCandidates = [];
  for (let i = 2; i <= limit; i += 1) {
    remainingCandidates.push(i);
  }

  const primes = [];
  while (remainingCandidates.length > 0) {
    candidates = remainingCandidates;
    remainingCandidates = [];

    // the first item in the array must be a prime
    const prime = candidates.shift();
    primes.push(prime);

    // Go through and remove items from the array that are not
    // a prime
    for (const candidate of candidates) {
      if (candidate % prime) {
        remainingCandidates.push(candidate);
      }
    }
  }
  return primes;
}

const primes = findPrimes(20);
console.log(primes);
