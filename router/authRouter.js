/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
const express = require('express');
const authRouter = express.Router();
const votingController = require('../controllers/voting.controller');
const authController = require('../controllers/auth.controllers');
const authenticateUser = require('../middlewares/auth.middleware');

authRouter.use(authController.flashMessage);

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

authRouter.get(
  '/my-voting',
  authenticateUser,
  votingController.getMyVoting
);

module.exports = authRouter;
