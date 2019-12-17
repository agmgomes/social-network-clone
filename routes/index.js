const router = require('express').Router();

const users = require('./users');
const posts = require('./posts');
const comments = require('./comments');
const auth = require('./auth');

router.use('/users', users);
router.use('/posts', posts);
router.use('/comments', comments);
router.use('/auth', auth);

module.exports = router;
