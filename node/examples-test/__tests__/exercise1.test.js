const lib = require('../exercise1');

describe('fizzBuzz', () => {
  it('should reject non-number inputs', () => {
    const args = [null, undefined, [], {}, '', false];
    args.forEach((a) => {
      expect(() => {
        lib.fizzBuzz(a);
      }).toThrow();
    });
  });

  it('should return FizzBuzz if input %[3,5]', () => {
    const result = lib.fizzBuzz(15);
    expect(result).toBe('FizzBuzz');
  });

  it('should return Fizz if input %3', () => {
    const result = lib.fizzBuzz(3);
    expect(result).toBe('Fizz');
  });

  it('should return FizzBuzz if input %5', () => {
    const result = lib.fizzBuzz(5);
    expect(result).toBe('Buzz');
  });

  it('should return the number otherwise', () => {
    const result = lib.fizzBuzz(4);
    expect(result).toBe(4);
  });
});
