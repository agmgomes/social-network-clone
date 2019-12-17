const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  hashPassword: async (password, saltRounds = 10) => {
    let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(password, salt);
    return hash;
  },

  verifyPassword: async (password, hash) => {
    return await bcrypt.compare(password, hash);
  },

  assignToken: userId => {
    let token = jwt.sign({ user_id: userId }, process.env.JWT_SECRET, {
      expiresIn: 3600
    });
    return token;
  },

  verifyToken: token => {
    try {
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      console.log(error);
    }
  }
};
