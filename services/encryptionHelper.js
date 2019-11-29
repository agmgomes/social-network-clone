const bcrypt = require('bcryptjs');

module.exports = {
  hashPassword: async (password, saltRounds = 10) => {
    let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(password, salt);
    return hash;
  }
};
