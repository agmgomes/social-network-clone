const { User, Post, Comment } = require('../models');
const { Op } = require('sequelize');
const encryptionHelper = require('../services/encryptionHelper');

module.exports = {
  getAllUsers: async (req, res) => {
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

  getUserByID: async (req, res) => {
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

  getAllUserPosts: async (req, res) => {
    const { id } = req.params;

    try {
      let posts = await Post.findAll({
        where: { user_id: id }
      });

      if (posts.length === 0) {
        return res.status(404).json({
          msg: 'no posts founded'
        });
      }

      res.json(posts);
    } catch (error) {
      console.log(error);
    }
  },

  getUserPostByID: async (req, res) => {
    const { id, post_id } = req.params;

    try {
      let post = await Post.findOne({
        where: {
          id: post_id,
          user_id: id
        }
      });

      if (!post) {
        return res.status(404).json({
          msg: 'post not found'
        });
      }

      res.json(post);
    } catch (error) {
      console.log(error);
    }
  },

  getAllUserComents: async (req, res) => {
    const { id } = req.params;

    try {
      let comments = await Comment.findAll({
        where: { user_id: id }
      });

      if (comments.length === 0) {
        return res.status(404).json({
          msg: 'no comments founded'
        });
      }

      res.json(comments);
    } catch (error) {
      console.log(error);
    }
  },

  getUserCommentByID: async (req, res) => {
    const { id, comment_id } = req.params;

    try {
      let comment = await Comment.findOne({
        where: {
          id: comment_id,
          user_id: id
        }
      });

      if (!comment) {
        return res.status(404).json({
          msg: 'comment not found'
        });
      }

      res.json(comment);
    } catch (error) {
      console.log(error);
    }
  },

  registerUser: async (req, res) => {
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

  deleteUser: async (req, res) => {
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
