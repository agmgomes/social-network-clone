const router = require('express').Router();

const { postController } = require('../controllers');
const {
  postValidator,
  commentValidator,
  authValidator
} = require('../validators');

/**
 * GET /posts/
 * desc Get all posts
 * access Public
 */
router.get('/', postController.getAllPosts);

/**
 * GET /posts/:id
 * desc Get a post by ID
 * access Public
 */
router.get('/:id', postController.getPostByID);

/**
 * POST /posts/
 * desc Submit a post
 * access Authorized User
 */
router.post(
  '/',
  postValidator.submitPost,
  authValidator.validateToken,
  postController.submitPost
);

/**
 * POST /posts/:post_id/comments
 * desc Submit a comment on a post
 * access Authorized User
 */
router.post(
  '/:post_id/comments',
  commentValidator.submitComment,
  authValidator.validateToken,
  postController.submitComment
);

/**
 * PATCH /posts/id
 * desc Edit a post
 * access Authorized User
 */
router.patch(
  '/:id',
  postValidator.submitPost,
  authValidator.validateToken,
  postController.editPostByID
);

module.exports = router;
