const { Comment } = require('../models');

module.exports = {
  getAllComments: async (req, res) => {
    try {
      let comments = await Comment.findAll({
        attributes: ['id', 'text'],
        include: [
          { association: 'post', attributes: ['id', 'title'] },
          { association: 'user', attributes: ['id', 'name', 'username'] }
        ]
      });

      res.json(comments);
    } catch (error) {
      console.log(error);
    }
  },

  getCommentByID: async (req, res) => {
    const { id } = req.params;
    try {
      let comment = Comment.findByPk(id, {
        attributes: ['id', 'text'],
        include: [
          { association: 'post', attributes: ['id', 'title'] },
          { association: 'user', attributes: ['id', 'name', 'username'] }
        ]
      });

      res.json(comment);
    } catch (error) {
      console.log(error);
    }
  },

  editCommentByID: async (req, res) => {
    const { text } = req.body;
    const { id } = req.params;
    const { user_id } = res.locals;

    try {
      let comment = await Comment.findOne({
        where: { id, user_id }
      });

      comment.update({
        text
      });
    } catch (error) {
      console.log(error);
    }
  },

  deleteComment: async (req, res) => {
    const { id } = req.params;

    try {
      let commment = await Comment.findByPk(id);
      await commment.destroy();

      res.sendStatus(204);
    } catch (error) {
      console.log(error);
    }
  }
};
