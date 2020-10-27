const express = require('express');
const router = express.Router();
const loginRouter = require('./login');
const signupRouter = require('./signup');
const userRouter = require('./my-votings');
const votingRouter = require('./votings');
const mainController = require('./controllers/main.controller');

router.get('/',
  mainController.getAllVotes,
  (req, res, next) => {
    const votesData = req.votesData;
    res.render('index', { votesData });
});

router.use('/login', loginRouter);
router.use('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});
router.use('/signup', signupRouter);
router.use('/votings', votingRouter);
router.use('/my-votings', userRouter);

module.exports = router;
