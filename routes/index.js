const express = require('express');

const home = require('./home');
const signup = require('./signup');
const login = require('./login');
const voting = require('./voting');
const notFound = require('./notFound');
const errorHandler = require('./errorHandler');

const router = express.Router();

router.use('/', home);
router.use('/signup', signup);
router.use('/login', login);
router.use('/voting', voting);

router.use(notFound);
router.use(errorHandler);

module.exports = router;
