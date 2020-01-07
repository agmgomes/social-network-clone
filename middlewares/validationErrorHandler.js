const { responseSender } = require('../services/');
const { isCelebrate } = require('celebrate');

module.exports = validationErrorHandler = (err, req, res, next) => {
  if (isCelebrate(err)) {
    const { joi } = err;

    return responseSender.badRequest(res, joi.details[0].message);
  }

  return next(err);
};
