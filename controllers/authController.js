const User = require('../models/User');
const encryptionHelper = require('../services/encryptionHelper');

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      let user = await User.findOne({
        where: { username }
      });
      if (!user)
        return res.status(404).json({
          msg: 'Username not found',
          status: 404
        });

      let isPasswordValid = await encryptionHelper.verifyPassword(
        password,
        user.password
      );
      if (!isPasswordValid)
        return res.status(400).json({
          msg: 'Password incorrect',
          status: 400
        });

      let token = encryptionHelper.assignToken(user.id);
      let decoded = encryptionHelper.verifyToken(token);

      return res.json({
        token,
        decoded
      });
    } catch (error) {
      console.log(error);
    }
  }
};
