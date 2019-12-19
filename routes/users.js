const router = require('express').Router();

const { userController } = require('../controllers');
const { userValidator } = require('../validators');

/**
 * route GET /users/
 * desc Get all users
 * access Public
 */
router.get('/', userController.getAllUsers);

/**
 * route GET /users/:id
 * desc Get user by Id
 * access Public
 */
router.get('/:id', userController.getUserByID);

/**
 * route GET /users/:id/posts
 * desc Get all user's posts
 * access Public
 */
router.get('/:id/posts', userController.getAllUserPosts);

/**
 * route GET /users/:id/posts/:post_id
 * desc Get a single post from a user
 * access Public
 */
router.get('/:id/posts/:post_id', userController.getUserPostByID);

/**
 * route GET /users/:id/comments/
 * desc Get all user's comments
 * access Public
 */
router.get('/:id/comments', userController.getAllUserComents);

/**
 * route GET /users/:id/comments/:comment_id
 * desc Get a single comment from a user
 * access Public
 */
router.get('/:id/comments/:comment_id', userController.getUserCommentByID);

/**
 * route POST /users/
 * desc Register a new user
 * access Public
 */
router.post('/', userValidator.register, userController.registerUser);

/**
 * route DELETE /users/:id
 * desc Delete a user
 * access Public
 */
router.delete('/:id', userController.deleteUser);

module.exports = router;
