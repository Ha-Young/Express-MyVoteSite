const express = require('express');
const router = express.Router();
const authController = require('./controller/auth.controller');
const votingController = require('./controller/voting.controller');
const { authorizeUser } = require('./middleware/authentication');

router.get('/', authorizeUser, votingController.updateVotingStatus, votingController.getAllVotings);

router.get('/signup', authController.getSignupPage);
router.post('/signup', authController.validateUserData, authController.createUserData);
router.post('/signup/checkid', authController.checkDuplicateId);

router.get('/login', authController.getLoginPage);
router.post('/login', authController.loginFailure, authController.loginSuccess);
router.get('/logout', authController.logout);

module.exports = router;
