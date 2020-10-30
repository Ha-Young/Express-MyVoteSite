const express = require('express');
const router = express.Router();
const indexController = require('./controllers/index.controller');

const loginRouter = require('./login');
const logoutRouter = require('./logout');
const signupRouter = require('./signup');
const votingRouter = require('./votings');
const userRouter = require('./my-votings');

router.get('/',
  indexController.getAllVotings,
  indexController.renderIndex,
);

router.use('/login', loginRouter);
router.use('/logout', logoutRouter);
router.use('/signup', signupRouter);
router.use('/votings', votingRouter);
router.use('/my-votings', userRouter);

module.exports = router;
