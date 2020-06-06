const Joi = require('@hapi/joi');
const moment = require('moment');
const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

rentalSchema.statics.lookup = function lookup(customerId, movieId) {
  return this.findOne({
    'customer._id': customerId,
    'movie._id': movieId,
  });
};

rentalSchema.methods.return = function returnThisRental() {
  this.dateReturned = new Date();

  const days = moment(this.dateReturned).diff(this.dateOut, 'days');
  this.rentalFee = days * this.movie.dailyRentalRate;
};

const Rental = mongoose.model('Rental', rentalSchema);

// This is how to validate objectIDs
function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  return schema.validate(rental);
}

exports.Rental = Rental;
exports.validate = validateRental;
