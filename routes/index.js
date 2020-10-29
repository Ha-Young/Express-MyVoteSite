const express = require('express');
const router = express.Router();
const gateKeeper = require('./middlewares/gateKeeper');
const { getAll, getMine } = require('./controllers/getVotings.controller');
const validateSignupForm = require('./middlewares/validateSignupForm');
const checkIsEmailRegistered = require('./middlewares/checkIsEmailRegistered');
const { registerNewUser } = require('./controllers/userManagement.controller');
const { passportAuthenticate } = require('./controllers/userManagement.controller');

router.get('/', getAll);
router.get('/my-votings', gateKeeper, getMine);

router.get('/signup', (req, res, next) => {
  res.status(200).render('signup');
});
router.post('/signup', validateSignupForm, checkIsEmailRegistered, registerNewUser);

router.get('/login', (req, res, next) => {
  res.status(200).render('login', {
    referer: req.headers.referer
  });
});
router.post('/login', passportAuthenticate);

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);

      return;
    }

    res.status(302).redirect('/');
  });
});

module.exports = router;
