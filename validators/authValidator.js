const { encryptionHelper } = require('../services');

module.exports = {
  validateToken: async (req, res, next) => {
    const { token } = req;

    if (!token) return res.status(400).json({ msg: 'no token provided' });

    let decodedToken = encryptionHelper.verifyToken(token);

    if (!decodedToken) return res.status(401).json({ msg: 'invalid token' });

    res.locals = decodedToken;
    next();
  }
};
