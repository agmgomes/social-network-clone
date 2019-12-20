const { User, Post, Comment } = require('../models');
const { Op } = require('sequelize');
const { encryptionHelper, responseSender } = require('../services');

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      let users = await User.findAll({
        attributes: ['id', 'name', 'username', 'email']
      });
      if (users.length === 0)
        return responseSender.notFound(res, 'Users not found');
      res.json(users);
    } catch (err) {
      return next(err);
    }
  },

  getUserByID: async (req, res, next) => {
    const { id } = req.params;

    try {
      let user = await User.findByPk(id, {
        attributes: ['id', 'name', 'username', 'email']
      });
      if (!user) return responseSender.notFound(res, 'User not found');

      res.json(user);
    } catch (err) {
      return next(err);
    }
  },

  getAllUserPosts: async (req, res, next) => {
    const { id } = req.params;

    try {
      let posts = await Post.findAll({
        where: { user_id: id }
      });

      if (posts.length === 0) {
        return responseSender.notFound(res, 'Posts not found');
      }

      res.json(posts);
    } catch (err) {
      return next(err);
    }
  },

  getUserPostByID: async (req, res, next) => {
    const { id, post_id } = req.params;

    try {
      let post = await Post.findOne({
        where: {
          id: post_id,
          user_id: id
        }
      });

      if (!post) {
        return responseSender.notFound(res, 'Post not found');
      }

      res.json(post);
    } catch (err) {
      return next(err);
    }
  },

  getAllUserComents: async (req, res, next) => {
    const { id } = req.params;

    try {
      let comments = await Comment.findAll({
        where: { user_id: id }
      });

      if (comments.length === 0) {
        return responseSender.notFound(res, 'Comments not found');
      }

      res.json(comments);
    } catch (err) {
      return next(err);
    }
  },

  getUserCommentByID: async (req, res, next) => {
    const { id, comment_id } = req.params;

    try {
      let comment = await Comment.findOne({
        where: {
          id: comment_id,
          user_id: id
        }
      });

      if (!comment) {
        return responseSender.notFound(res, 'Comment not found');
      }

      res.json(comment);
    } catch (err) {
      return next(err);
    }
  },

  registerUser: async (req, res, next) => {
    const newUser = ({ name, username, email, password } = req.body);

    try {
      let user = await User.findOne({
        where: { [Op.or]: [{ username }, { email }] }
      });

      if (user) {
        return responseSender.conflict(res, 'Username/email already exists');
      }
    } catch (err) {
      return next(err);
    }

    try {
      newUser.password = await encryptionHelper.hashPassword(password);
      let user = await User.create(newUser);
      res.json(user);
    } catch (err) {
      return next(err);
    }
  },

  deleteUser: async (req, res, next) => {
    const { id } = req.params;

    try {
      let deletedUser = await User.destroy({
        where: { id }
      });

      if (deletedUser) {
        return responseSender.noContent(res);
      }

      return responseSender.notFound(res, 'User not found');
    } catch (err) {
      return next(err);
    }
  }
};
