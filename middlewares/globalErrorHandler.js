const { responseSender } = require('../services');

module.exports = globalErrorHandler = (err, req, res, next) => {
  return responseSender.internalServerError(res, 'Internal Server Error');
};
