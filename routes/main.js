const express = require('express');
const router = express.Router();
const authController = require('./controller/auth.controller');
const votingController = require('./controller/voting.controller');
const { authorizeUser } = require('./middleware/authentication');

router.get('/', authorizeUser, votingController.updateVotingStatus, votingController.getAllVotings);
router.get('/signup', authController.getSignupPage);
router.post('/signup', authController.validateUserData, authController.createUserData);
router.get('/login', authController.getLoginPage);
router.post('/login', authController.loginFailure, authController.loginSuccess);
router.get('/logout', authController.logout);

router.get('/votings', authorizeUser, votingController.getMyVotings);
router.get('/votings/new', authorizeUser, votingController.getNewVotingForm);
router.post('/votings/new', authorizeUser, votingController.createVoting);
router.get('/votings/:id', authorizeUser, votingController.getOneVotingById);
router.post('/votings/:id', authorizeUser, votingController.voteSelection);
router.delete('/votings/:id', authorizeUser, votingController.deleteVoting);

module.exports = router;
