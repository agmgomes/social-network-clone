const router = require('express').Router();

const { authController } = require('../controllers');
const { userValidator } = require('../validators');

/**
 * route POST /auth/
 * desc Login
 * Access Public
 */
router.post('/login', userValidator.login, authController.login);

module.exports = router;
