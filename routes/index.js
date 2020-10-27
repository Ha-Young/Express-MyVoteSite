const express = require('express');

const verifyAuthorization = require('../middleware/verifyAuthorization');
const getUserInfo = require('../middleware/getUserInfo');
const home = require('./home');
const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const votings = require('./votings');
const myVotings = require('./my-votings');
const notFound = require('./notFound');
const errorHandler = require('./errorHandler');

const router = express.Router();

router.use(getUserInfo);

router.use('/', home);
router.use('/signup', signup);
router.use('/login', login);
router.use('/votings', votings);

router.use(verifyAuthorization);

router.use('/logout', logout);
router.use('/my-votings', myVotings);

router.use(notFound);
router.use(errorHandler);

module.exports = router;
