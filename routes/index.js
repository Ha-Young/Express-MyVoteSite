const express = require('express');

const {
  verifyAuthorization,
  getUserInfo,
}= require('../middleware');
const home = require('./home');
const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const votings = require('./votings');
const myVotings = require('./my-votings');
const notFound = require('./not-found');
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
