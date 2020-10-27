/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
const express = require('express');
const authRouter = express.Router();
const votingController = require('../controllers/voting.controller');
const authenticateUser = require('../middlewares/auth.middleware');
const {
  flashMessage,
  registerUser,
  postLogin,
  logOut,
} = require('../controllers/auth.controllers');

authRouter.use(flashMessage);

// authRouter.get('/', authenticateUser, (req, res, _next) =>
//   res.redirect('/votings')
// );

authRouter.get('/', votingController.getVotingList);

authRouter.get('/signup', (req, res, _next) => res.render('index'));

authRouter.post('/signup', registerUser);

authRouter.get('/login', (req, res, _next) => res.render('login'));

authRouter.post('/login', postLogin);

authRouter.get('/logout', logOut);

authRouter.get('/my-voting', authenticateUser, votingController.getMyVoting);

module.exports = authRouter;
