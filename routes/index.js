const express = require('express');
const router = express.Router();
const loginRouter = require('./login');
const signupRouter = require('./signup');
const userRouter = require('./my-votings');
const votingRouter = require('./votings');
const indexController = require('./controllers/index.controller');

router.get('/',
  indexController.getAllVotings,
  indexController.renderIndex,
);

router.use('/login', loginRouter);
router.use('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});
router.use('/signup', signupRouter);
router.use('/votings', votingRouter);
router.use('/my-votings', userRouter);

module.exports = router;
