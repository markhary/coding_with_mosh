const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const { User, validate } = require('../../../models/user');

describe('user.generateAuthToken', () => {
  it('should be a valid token', () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    expect(decoded).toMatchObject(payload);
  });
});

describe('user.validate', () => {
  const user = {
    name: 'test user',
    email: 'user@test.com',
    password: 'AAAbc1ef_',
    isAdmin: true,
  };
  it('should be a valid object', () => {
    const { value, error } = validate(user);
    expect(error).toBeUndefined();
    expect(value).toMatchObject(user);
  });
  it('should work for limits of valid object', () => {
    const { value, error } = validate(user);
    expect(error).toBeUndefined();
    expect(value).toMatchObject(user);

    const names = ['a'.repeat(5), 'a'.repeat(50)];
    names.forEach((n) => {
      user.name = n;
      const validated = validate(user);
      expect(validated.error).toBeUndefined();
    });

    const emails = ['a@b.co', `${'a'.repeat(64)}@b.co`, `${'a'.repeat(64)}@${'b'.repeat(63)}.co`];
    emails.forEach((e) => {
      user.email = e;
      const validated = validate(user);
      expect(validated.error).toBeUndefined();
    });

    const isAdmin = [true, false];
    isAdmin.forEach((n) => {
      user.isAdmin = n;
      const validated = validate(user);
      expect(validated.error).toBeUndefined();
    });
  });

  it('name should be invalid', () => {
    const names = ['', '#'.repeat(51), 1, true, undefined, NaN, {}, []];
    names.forEach((n) => {
      user.name = n;
      const validated = validate(user);
      expect(validated.error).toBeDefined();
    });
  });

  it('email should be invalid', () => {
    const emails = ['', `a@b${'#'.repeat(253)}`, 1, true, undefined, NaN, {}, []];
    emails.forEach((e) => {
      user.email = e;
      const validated = validate(user);
      expect(validated.error).toBeDefined();
    });
  });

  it('password should be invalid', () => {
    const password = ['abcdefgh', `A1_${'a'.repeat(24)}`];
    password.forEach((p) => {
      user.password = p;
      const validated = validate(user);
      expect(validated.error).toBeDefined();
    });
  });

  it('isAdmin should be invalid', () => {
    const admin = ['', 1, undefined, NaN, {}, []];
    admin.forEach((a) => {
      user.admin = a;
      const validated = validate(user);
      expect(validated.error).toBeDefined();
    });
  });
});
