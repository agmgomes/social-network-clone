module.exports = validationErrorHandler = (err, req, res, next) => {
  console.log('validationErrorHandler');

  const { joi } = err;

  if (joi.isJoi) {
    console.log(joi.details[0].context);
    console.log(joi.details[0].message);
  }

  return next(err);
};
