const router = require('express').Router();

const userController = require('../controllers/userController');

/**
 * route GET /users/
 * desc Get all users
 * access Public
 */
router.get('/', userController.getAll);

/**
 * route GET /users/:id
 * desc Get user by Id
 * access Public
 */
router.get('/:id', userController.getByID);

/**
 * route POST /users/register
 * desc Register a new user
 * access Public
 */
router.post('/register', userController.register);

/**
 * route DELETE /users/delete/:id
 * desc Delete a user
 * access Public
 */
router.delete('/delete/:id', userController.delete);

module.exports = router;
