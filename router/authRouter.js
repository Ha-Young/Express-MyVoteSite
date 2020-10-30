const express = require('express');
const authRouter = express.Router();
const votingController = require('../controllers/voting.controller');
const authController = require('../controllers/auth.controllers');

authRouter.get(
  '/',
  votingController.getVotingList
);

authRouter.get(
  '/signup',
  authController.getSignUp
);

authRouter.post(
  '/signup',
  authController.registUser
);

authRouter.get(
  '/login',
  authController.getLogIn
);

authRouter.post(
  '/login',
  authController.logInUser
);

authRouter.get(
  '/logout',
  authController.logOut
);

module.exports = authRouter;
