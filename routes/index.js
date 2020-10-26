const express = require('express');
const router = express.Router();
const loginRouter = require('./login');
const signupRouter = require('./signup');
const userRouter = require('./my-votings');
const votingRouter = require('./votings');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'show all votes'});
});

router.use('/login', loginRouter);
router.use('/signup', signupRouter);
router.use('/votings', votingRouter);
router.use('/my-votings', userRouter);

module.exports = router;
