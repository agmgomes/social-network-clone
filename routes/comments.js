const router = require('express').Router();

const commentController = require('../controllers/commentController');

/**
 * GET /comments/
 * desc Get all comments
 * access Public
 */
router.get('/', commentController.getAllComments);

/**
 * GET /comments/:id
 * desc Get a comment by ID
 * access Public
 */
router.get('/:id', commentController.getCommentByID);

/**
 * PATCH /comments/:id
 * desc Edit a comment
 * access Public
 */
router.patch('/:id', commentController.editCommentByID);

/**
 * DELETE /comments/:id
 * desc Delete a comment
 * access Public
 */
router.delete('/:id', commentController.deleteComment);

module.exports = router;