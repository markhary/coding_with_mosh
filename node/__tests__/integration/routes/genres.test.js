/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const request = require('supertest');

const { Genre } = require('../../../models/genre');
const { User } = require('../../../models/user');

describe('/api/genres/', () => {
  let server;

  beforeEach(() => {
    // eslint-disable-next-line global-require
    server = require('../../../index');
  });
  afterEach(async () => {
    await Genre.deleteMany({});
    await server.close();
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      await Genre.collection.insertMany([{ name: 'genre1' }, { name: 'genre2' }]);

      const res = await request(server).get('/api/genres');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === 'genre1')).toBeTruthy();
      expect(res.body.some((g) => g.name === 'genre2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    let token;
    let id;
    const name = 'genre1';

    // Define the happy path, and then in each test, we change
    // one parameter that clearly aligns with the name of the
    // test

    // happy path
    // prettier-ignore
    const exec = () => request(server).get(`/api/genres/${id}`);
    // end happy path

    beforeEach(async () => {
      const genre = await Genre.create({ name });
      id = genre._id;
    });

    it('should return 404 if an invalid object id is provided', async () => {
      id = 1;
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should return 404 if no genre with the given id exists', async () => {
      id = mongoose.Types.ObjectId();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should return specified id', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', name);
    });
  });

  describe('POST /', () => {
    let token;
    let name;

    // Define the happy path, and then in each test, we change
    // one parameter that clearly aligns with the name of the
    // test

    // happy path
    // prettier-ignore
    const exec = () => request(server)
      .post('/api/genres')
      .set('x-auth-token', token)
      .send({ name });
    // end happy path

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = 'genre1';
    });

    it('should return 401 if client is not logged in', async () => {
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it('should return 400 if genre is less than 5 characters', async () => {
      name = '1234';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if genre is more than 50 characters', async () => {
      name = 'a'.repeat(51);
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should save the genre if it is valid', async () => {
      await exec();
      const genre = await Genre.find({ name: 'genre1' });
      expect(genre).not.toBeNull();
    });

    it('should return the genre if it is valid', async () => {
      const res = await exec();
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genre1');
    });
  });

  describe('PUT /:id', () => {
    let token;
    let id;

    // Define the happy path, and then in each test, we change
    // one parameter that clearly aligns with the name of the
    // test

    // happy path
    // prettier-ignore
    const exec = () => request(server)
      .put(`/api/genres/${id}`)
      .set('x-auth-token', token)
      .send({ name: 'genre2' });
    // end happy path

    beforeEach(async () => {
      token = new User().generateAuthToken();
      const genre = await Genre.create({ name: 'genre1' });
      id = genre._id;
    });

    it('should return 401 if client is not logged in', async () => {
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it('should return 404 if an invalid object id is provided', async () => {
      id = 1;
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should return 404 if no genre with the given id exists', async () => {
      id = mongoose.Types.ObjectId();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should update the genre if it is valid', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genre2');
    });
  });

  describe('DELETE /:id', () => {
    let token;
    let id;
    const name = 'genre1';

    // Define the happy path, and then in each test, we change
    // one parameter that clearly aligns with the name of the
    // test

    // happy path
    // prettier-ignore
    const exec = () => request(server)
      .delete(`/api/genres/${id}`)
      .set('x-auth-token', token);
    // end happy path

    beforeEach(async () => {
      token = new User({ isAdmin: true }).generateAuthToken();
      const genre = await Genre.create({ name });
      id = genre._id;
    });

    it('should return 401 if client is not logged in', async () => {
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it('should return 404 if an invalid object id is provided', async () => {
      id = 1;
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should return 404 if no genre with the given id exists', async () => {
      id = mongoose.Types.ObjectId();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should return 403 if the user is not an admin', async () => {
      token = new User({ isAdmin: false }).generateAuthToken();
      const res = await exec();
      expect(res.status).toBe(403);
    });

    it('should delete the genre if it is valid', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });
});
