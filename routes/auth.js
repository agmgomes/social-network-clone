const router = require('express').Router();

const authController = require('../controllers/authController');

/**
 * route POST /auth/
 * desc Login
 * Access Public
 */
router.post('/login', authController.login);

module.exports = router;
