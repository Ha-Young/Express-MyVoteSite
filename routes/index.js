const express = require('express');
const router = express.Router();
const login = require('./login');
const home = require('./home');
const votings = require('./votings');
const myVotings = require('./myVotings');
const signup = require('./signup');
const auth = require('./auth');
const error = require('./error');

router.use('/', home);
router.use('/login', login);
router.use('/votings', votings);
router.use('/my-votings', myVotings);
router.use('/signup', signup);
router.use('/auth', auth);
router.use('/error', error);

module.exports = router;
