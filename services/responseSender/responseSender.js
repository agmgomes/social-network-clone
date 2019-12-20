const httpStatus = require('./httpStatus');

class ResponseSender {
  /** 20x Responses */
  success = (res, msg = {}, data = {}) => {
    res.status(httpStatus.OK).json({
      msg,
      data
    });
  };

  created = (res, msg = {}, data = {}) => {
    res.status(httpStatus.CREATED).json({
      msg,
      data
    });
  };

  noContent = res => {
    res.status(httpStatus.NO_CONTENT);
  };

  /** 40x Responses */
  badRequest = (res, msg = {}, data = {}) => {
    res.status(httpStatus.BAD_REQUEST).json({
      msg,
      data
    });
  };

  unauthorized = (res, msg = {}, data = {}) => {
    res.status(httpStatus.UNAUTHORIZED).json({
      msg,
      data
    });
  };

  notFound = (res, msg = {}, data = {}) => {
    res.status(httpStatus.NOT_FOUND).json({
      msg,
      data
    });
  };

  forbidden = (res, msg = {}, data = {}) => {
    res.status(httpStatus.FORBIDDEN).json({
      msg,
      data
    });
  };

  /** 50x Responses */
  internalServerError = (res, msg = {}, data = {}) => {
    res.status(httpStatus.internalServerError).json({
      msg,
      data
    });
  };

  badGateway = (res, msg = {}, data = {}) => {
    res.status(httpStatus.BAD_GATEWAY).json({
      msg,
      data
    });
  };
}

module.exports = ResponseSender;
