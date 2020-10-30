const express = require('express');

const { getUserInfo, }= require('../middleware');
const error = require('./error');
const home = require('./home');
const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const votings = require('./votings');
const myPage = require('./myPage');
const notFound = require('./not-found');
const errorHandler = require('./errorHandler');

const router = express.Router();

router.use(getUserInfo);

router.use('/error', error);
router.use('/', home);
router.use('/signup', signup);
router.use('/login', login);
router.use('/votings', votings);
router.use('/logout', logout);
router.use('/my-page', myPage);

router.use(notFound);
router.use(errorHandler);

module.exports = router;
