const express = require('express');
const router = express.Router();
const loginController = require('./controllers/login.controller');
const passport = require('passport');

router.get('/', loginController.renderLogin);
router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

module.exports = router;
