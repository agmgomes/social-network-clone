const router = require('express').Router();

const { postController } = require('../controllers');
const { postValidator, commentValidator } = require('../validators');

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
 * access Public
 */
router.post('/', postValidator.submitPost, postController.submitPost);

/**
 * POST /posts/:post_id/comments
 * desc Submit a comment on a post
 * access Public
 */
router.post('/:post_id/comments', postController.submitComment);

/**
 * PATCH /posts/id
 * desc Edit a post
 * access Public
 */
router.patch('/:id', postController.editPostByID);

module.exports = router;
