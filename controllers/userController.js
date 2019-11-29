const User = require('../models/User');
const { Op } = require('sequelize');
const encryptionHelper = require('../services/encryptionHelper');

module.exports = {
  getAll: async (req, res) => {
    try {
      let users = await User.findAll({
        attributes: ['id', 'name', 'username', 'email']
      });
      if (users.length === 0) throw error;
      res.json(users);
    } catch (error) {
      res.status(404).json({
        msg: 'Users not found',
        status: 404
      });
    }
  },

  getByID: async (req, res) => {
    const { id } = req.params;

    try {
      let user = await User.findByPk(id, {
        attributes: ['id', 'name', 'username', 'email']
      });
      if (!user) throw error;
      res.json(user);
    } catch (error) {
      res.status(404).json({
        msg: 'User not found',
        status: 404
      });
    }
  },

  register: async (req, res) => {
    const newUser = ({ name, username, email, password } = req.body);
    //const newUser = {name, user, email, password}:
    console.log(newUser);

    try {
      let user = await User.findOne({
        where: { [Op.or]: [{ username }, { email }] }
      });
      if (user) throw error;
    } catch (error) {
      return res.status(404).json({
        msg: 'Username/email already exists',
        status: 404
      });
    }

    try {
      // Hashing the password
      newUser.password = await encryptionHelper.hashPassword(password);
      let user = await User.create(newUser);
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    try {
      let user = await User.findByPk(id);
      await user.destroy();
      res.sendStatus(204);
    } catch (error) {
      res.status(404).json({
        msg: 'User not found',
        error: 404
      });
    }
  }
};
