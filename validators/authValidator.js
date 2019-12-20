const { encryptionHelper, responseSender } = require('../services');

module.exports = {
  validateToken: async (req, res, next) => {
    const { token } = req;

    if (!token) return responseSender.badRequest(res, 'No token provided');

    let decodedToken = encryptionHelper.verifyToken(token);

    if (!decodedToken) return responseSender.forbidden(res, 'Invalid token');

    res.locals = decodedToken;

    next();
  }
};
