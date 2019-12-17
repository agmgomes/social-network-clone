const Post = require('../models/Post');
const Comment = require('../models/Comment');
const encryptionHelper = require('../services/encryptionHelper');

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      let posts = await Post.findAll({
        attributes: ['id', 'title', 'content'],
        include: [
          { association: 'user', attributes: ['id', 'name', 'username'] }
        ]
      });
      if (posts.length === 0) throw error;
      res.json(posts);
    } catch (error) {
      res.status(404).json({
        error: {
          msg: 'Posts not found',
          status: 404
        }
      });
    }
  },

  getPostByID: async (req, res) => {
    const { id } = req.params;

    try {
      let post = await Post.findByPk(id, {
        attributes: ['id', 'title', 'content'],
        include: [{ association: 'user', attributes: ['id', 'username'] }]
      });
      res.json(post);
    } catch (error) {
      res.status(404).json({
        error: {
          msg: 'Post not found - Invalid ID',
          error: 404
        }
      });
    }
  },

  submitPost: async (req, res) => {
    const { title, content } = req.body;

    const { authorization } = req.headers;
    let token = authorization.substr(7);
    /**
     * needs validation for token and req.body
     * token needs to have a certain pattern of a jsonwebtoken
     * and id from decoded needs to be an integer
     */
    let decoded = encryptionHelper.verifyToken(token);

    const { user_id } = decoded;
    const newPost = { title, content, user_id };

    try {
      let post = await Post.create(newPost);

      res.json(post);
    } catch (error) {
      console.log(error);
    }
  },

  submitComment: async (req, res) => {
    const { text } = req.body;
    const { post_id } = req.params;
    const { authorization } = req.headers;

    let token = authorization.substr(7);
    let decoded = encryptionHelper.verifyToken(token);

    const { user_id } = decoded;
    const newComment = { text, user_id, post_id };

    try {
      let comment = await Comment.create(newComment);
      res.json(comment);
    } catch (error) {
      console.log(error);
    }
  },

  editPostByID: async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const { authorization } = req.headers;
    let token = authorization.substr(7);
    /**
     * needs validation for token and req.body
     * token needs to have a certain pattern of a jsonwebtoken
     * and id from decoded needs to be an integer
     */
    let decoded = encryptionHelper.verifyToken(token);

    const { user_id } = decoded;

    try {
      let post = await Post.findOne({
        where: { id, user_id }
      });

      post.update({
        title,
        content
      });

      res.json(post);
    } catch (error) {
      console.log(error);
    }
  }
};
