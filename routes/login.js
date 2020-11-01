const express = require('express');
const passport = require('passport');
const router = express.Router();

const login = require('./controller/login.controller');

router.get('/', login.redirectHomeOrRenderLogin);
router.post('/', passport.authenticate('local'), login.redirectBackpageOrHome);

module.exports = router;
