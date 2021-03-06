/* eslint-disable no-console */
/* eslint-disable func-names */
const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absolute', () => {
  it('should return a positive number if input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it('should return a positive number if input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it('should return 0 if input is 0', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe('greet', () => {
  it('should return the greeting message', () => {
    const result = lib.greet('Mark');
    expect(result).toMatch(/Mark/);
    expect(result).toContain('Mark');
  });
});

describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies();

    // Don't check for defined or null, to generic
    // Don't check for order (unless that is important)
    // This is what you should do
    expect(result).toContain('USD');
    expect(result).toContain('AUD');
    expect(result).toContain('EUR');

    // Ideal for arrays
    expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
  });
});

describe('getCurrencies', () => {
  it('should return the product with the given id', () => {
    const result = lib.getProduct(1);
    expect(result).toEqual({ id: 1, price: 10 }); // Exactly the same
    expect(result).toMatchObject({ id: 1, price: 10 }); // Check subset of properties
    expect(result).toHaveProperty('id', 1); // This test is typed
  });
});

describe('registerUser', () => {
  it('should throw if username is falsy', () => {
    // Use parameterized tests if jest supports them
    const args = [null, undefined, NaN, '', 0, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });

  it('shouild return a user object if valid username is passed', () => {
    const result = lib.registerUser('mark');
    expect(result).toMatchObject({ username: 'mark' });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe('applyDiscount', () => {
  it('should apply 10% discuont if customer has more than 10 points', () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ id: 1, points: 20 });
    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
  it('should not apply 10% discuont if customer has 10 points or less', () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ id: 1, points: 10 });
    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(10);
  });
});

describe('notifyCustomer', () => {
  it('should send an email to the customer', () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe('a');
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});
