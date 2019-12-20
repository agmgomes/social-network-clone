const { Post, Comment } = require('../models');
const { responseSender } = require('../services');

module.exports = {
  getAllPosts: async (req, res, next) => {
    try {
      let posts = await Post.findAll({
        attributes: ['id', 'title', 'content'],
        include: [
          { association: 'user', attributes: ['id', 'name', 'username'] }
        ]
      });
      if (posts.length === 0) {
        return responseSender.notFound(res, 'Posts not found');
      }
      res.json(posts);
    } catch (err) {
      return next(err);
    }
  },

  getPostByID: async (req, res, next) => {
    const { id } = req.params;

    try {
      let post = await Post.findByPk(id, {
        attributes: ['id', 'title', 'content'],
        include: [{ association: 'user', attributes: ['id', 'username'] }]
      });

      if (!post) {
        return responseSender.notFound(res, 'Post not found');
      }

      res.json(post);
    } catch (err) {
      return next(err);
    }
  },

  submitPost: async (req, res, next) => {
    const { title, content } = req.body;
    const { user_id } = res.locals;

    const newPost = { title, content, user_id };

    try {
      let post = await Post.create(newPost);

      res.json(post);
    } catch (err) {
      return next(err);
    }
  },

  submitComment: async (req, res, next) => {
    const { text } = req.body;
    const { post_id } = req.params;
    const { user_id } = res.locals;

    const newComment = { text, user_id, post_id };

    try {
      let comment = await Comment.create(newComment);
      res.json(comment);
    } catch (error) {
      return next(err);
    }
  },

  editPostByID: async (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const { user_id } = res.locals;

    try {
      let post = await Post.findOne({
        where: { id, user_id }
      });

      if (!post) {
        return responseSender.notFound(res, 'Post not found');
      }

      post.update({
        title,
        content
      });

      res.json(post);
    } catch (err) {
      return next(err);
    }
  },

  deletePostByID: async (req, res, next) => {
    const { id } = req.params;
    const { user_id } = res.locals;

    try {
      let deletedPost = await Post.destroy({
        where: { id, user_id }
      });

      if (deletedPost) {
        return responseSender.noContent(res);
      }

      return responseSender.notFound(res, 'Post not found');
    } catch (err) {
      return next(err);
    }
  }
};
