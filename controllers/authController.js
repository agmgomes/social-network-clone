const { User } = require('../models');
const { encryptionHelper, responseSender } = require('../services');

module.exports = {
  login: async (req, res, next) => {
    const { username, password } = req.body;

    try {
      let user = await User.findOne({
        where: { username }
      });

      if (!user) {
        return responseSender.notFound(res, 'Wrong username');
      }

      let isPasswordValid = await encryptionHelper.verifyPassword(
        password,
        user.password
      );

      if (!isPasswordValid) {
        return responseSender.badRequest(res, 'Wrong password');
      }

      let token = encryptionHelper.assignToken(user.id);

      /**
       * implement responseSender for token
       */
      return res.json({
        username: user.username,
        token
      });
    } catch (err) {
      return next(err);
    }
  }
};
