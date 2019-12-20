const { Comment } = require('../models');
const { responseSender } = require('../services');

module.exports = {
  getAllComments: async (req, res, next) => {
    try {
      let comments = await Comment.findAll({
        attributes: ['id', 'text'],
        include: [
          { association: 'post', attributes: ['id', 'title'] },
          { association: 'user', attributes: ['id', 'name', 'username'] }
        ]
      });

      if (!comments) {
        return responseSender.notFound(res, 'Comments not found');
      }

      res.json(comments);
    } catch (err) {
      return next(err);
    }
  },

  getCommentByID: async (req, res, next) => {
    const { id } = req.params;
    try {
      let comment = Comment.findByPk(id, {
        attributes: ['id', 'text'],
        include: [
          { association: 'post', attributes: ['id', 'title'] },
          { association: 'user', attributes: ['id', 'name', 'username'] }
        ]
      });

      if (!comment) {
        return responseSender.notFound(res, 'Comment not found');
      }

      res.json(comment);
    } catch (err) {
      return next(err);
    }
  },

  editCommentByID: async (req, res, next) => {
    const { text } = req.body;
    const { id } = req.params;
    const { user_id } = res.locals;

    try {
      let comment = await Comment.findOne({
        where: { id, user_id }
      });

      if (!comment) {
        return responseSender.notFound(res, 'Comment not found');
      }

      comment.update({
        text
      });
    } catch (err) {
      return next(err);
    }
  },

  deleteComment: async (req, res, next) => {
    const { id } = req.params;
    const { user_id } = res.locals;

    try {
      let deleteComment = await Comment.destroy({
        where: { id, user_id }
      });

      if (deleteComment) {
        return responseSender.noContent(res);
      }

      return responseSender.notFound(res, 'Comment not found');
    } catch (err) {
      return next(err);
    }
  }
};
