var express = require('express');
var router = express.Router();
const login = require('./login');
const home = require('./home');
const votings = require('./votings');
const my_votings = require('./my_votings');
const signup = require('./signup');
const auth = require('./auth');
const { addUserInfo } = require('../middlewares/addUserInfo');

router.use(addUserInfo);
router.use('/', home);
router.use('/login', login);
router.use('/votings', votings);
router.use('/my_votings', my_votings);
router.use('/signup', signup);
router.use('/auth', auth);

module.exports = router;
