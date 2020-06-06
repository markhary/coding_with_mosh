const { compose, pipe } = require('lodash/fp');

input = { tag: 'JAVASCRIPT' };

const extract = (obj) => obj.tag;
const toLowerCase = (str) => str.toLowerCase();
const parens = (str) => `(${str})`;

const transform = pipe(extract, toLowerCase, parens);
const output = transform(input);

correct = '(javascript)';
if (output === correct) {
  console.log('pass');
} else {
  console.log('FAIL');
}
