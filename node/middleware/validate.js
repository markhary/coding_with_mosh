const mongoose = require('mongoose');

// eslint-disable-next-line consistent-return
module.exports.validateObjectId = function validateObjectId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send('Invalid ID.');

  next();
};

// eslint-disable-next-line arrow-body-style
module.exports.validate = (validator) => {
  // eslint-disable-next-line consistent-return
  return (req, res, next) => {
    const request = { body: req.body, params: req.params };
    const { error } = validator(request);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  };
};
