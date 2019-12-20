const httpStatus = require('./httpStatus');

module.exports = {
  /** 20x Responses */
  success: (res, msg = {}, data = undefined) => {
    res.status(httpStatus.OK).json({
      msg,
      data
    });
  },

  created: (res, msg = {}, data = undefined) => {
    res.status(httpStatus.CREATED).json({
      msg,
      data
    });
  },

  noContent: res => {
    res.sendStatus(httpStatus.NO_CONTENT);
  },

  /** 40x Responses */
  badRequest: (res, msg = {}, data = undefined) => {
    res.status(httpStatus.BAD_REQUEST).json({
      msg,
      data
    });
  },

  unauthorized: (res, msg = {}, data = undefined) => {
    res.status(httpStatus.UNAUTHORIZED).json({
      msg,
      data
    });
  },

  notFound: (res, msg = {}, data = undefined) => {
    res.status(httpStatus.NOT_FOUND).json({
      msg,
      data
    });
  },

  forbidden: (res, msg = {}, data = undefined) => {
    res.status(httpStatus.FORBIDDEN).json({
      msg,
      data
    });
  },

  conflict: (res, msg = {}, data = undefined) => {
    res.status(httpStatus.CONFLICT).json({
      msg,
      data
    });
  },

  /** 50x Responses */
  internalServerError: (res, msg = {}, data = undefined) => {
    res.status(httpStatus.internalServerError).json({
      msg,
      data
    });
  },

  badGateway: (res, msg = {}, data = undefined) => {
    res.status(httpStatus.BAD_GATEWAY).json({
      msg,
      data
    });
  }
};
