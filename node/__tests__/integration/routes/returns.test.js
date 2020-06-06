/* eslint-disable no-underscore-dangle */
const moment = require('moment');
const mongoose = require('mongoose');
const request = require('supertest');

const { Movie } = require('../../../models/movie');
const { Rental } = require('../../../models/rental');
const { User } = require('../../../models/user');

describe('/api/returns', () => {
  let server;
  let customerId;
  let movie;
  let movieId;
  let rental;
  let token;

  beforeEach(async () => {
    // eslint-disable-next-line global-require
    server = require('../../../index');
    customerId = mongoose.Types.ObjectId();
    token = new User().generateAuthToken();

    movie = new Movie({
      title: 'movie title',
      dailyRentalRate: 2.99,
      numberInStock: 5,
    });
    movie = await movie.save();
    movieId = movie._id;

    rental = new Rental({
      customer: {
        _id: customerId,
        name: 'customer name',
        phone: '12345',
      },
      movie,
    });
    await rental.save();
  });

  afterEach(async () => {
    await Rental.deleteMany({});
    await server.close();
  });

  // prettier-ignore
  const exec = () => request(server)
    .post('/api/returns')
    .set('x-auth-token', token)
    .send({ customerId, movieId });

  // Return 401 if client is not logged in
  it('should return 401 if client is not logged in', async () => {
    token = '';
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it('should return 400 if the customerId is not provided', async () => {
    customerId = '';
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('should return 400 if the movieId is not provided', async () => {
    movieId = '';
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('should return 404 if no rental found for this customer/movie combination', async () => {
    movieId = mongoose.Types.ObjectId();
    customerId = mongoose.Types.ObjectId();

    const res = await exec();
    expect(res.status).toBe(404);
  });

  it('should return 400 if rental already processed', async () => {
    rental.dateReturned = new Date();
    await rental.save();
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('should return 200 if a valid test was received', async () => {
    await rental.save();
    const res = await exec();
    expect(res.status).toBe(200);
  });

  it('should set the return date if input is valid', async () => {
    await exec();
    rental = await Rental.findById(rental._id);
    const seconds = moment(new Date()).diff(rental.dateReturned, 'seconds');
    expect(seconds).toBeLessThan(10);
  });

  it('should set the rental fee if input is valid', async () => {
    rental.dateOut = moment().subtract(7, 'days').toDate();
    await rental.save();
    await exec();
    rental = await Rental.findById(rental._id);
    const days = moment(rental.dateReturned).diff(rental.dateOut, 'days');
    const fee = days * rental.movie.dailyRentalRate;
    expect(rental.rentalFee).toBeCloseTo(fee);
  });

  it('should set the rental fee if input is valid', async () => {
    rental.dateOut = moment().subtract(7, 'days').toDate();
    await rental.save();
    await exec();
    rental = await Rental.findById(rental._id);
    const days = moment(rental.dateReturned).diff(rental.dateOut, 'days');
    const fee = days * rental.movie.dailyRentalRate;
    expect(rental.rentalFee).toBeCloseTo(fee);
  });

  it('should increase the stock if input is valid', async () => {
    await exec();
    const after = await Movie.findById(movieId);
    expect(movie.numberInStock + 1).toBe(after.numberInStock);
  });

  it('should return the rental if input is valid', async () => {
    const res = await exec();
    await Rental.findById(rental._id);
    const keys = ['dateOut', 'dateReturned', 'rentalFee', 'customer', 'movie'];
    expect(Object.keys(res.body)).toEqual(expect.arrayContaining(keys));
  });
});
