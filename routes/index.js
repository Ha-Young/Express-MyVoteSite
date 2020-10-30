const express = require('express');
const router = express.Router();
const gateKeeper = require('./middlewares/gateKeeper');
const { getAll, getMine } = require('./controllers/getVotings.controller');
const validateSignupForm = require('./middlewares/validateSignupForm');
const checkIsEmailRegistered = require('./middlewares/checkIsEmailRegistered');
const { registerNewUser } = require('./controllers/userManagement.controller');
const { passportAuthenticate } = require('./controllers/userManagement.controller');
const {
  ROOT,
  MY_VOTINGS,
  SIGNUP,
  LOGIN,
  LOGOUT,
} = require('../constants/urls');
const { SIGNUP_TEMPLATE, LOGIN_TEMPLATE } = require('../constants/views');

router.get(ROOT, getAll);
router.get(MY_VOTINGS, gateKeeper, getMine);

router.get(SIGNUP, (req, res, next) => {
  res.status(200).render(SIGNUP_TEMPLATE);
});
router.post(SIGNUP, validateSignupForm, checkIsEmailRegistered, registerNewUser);

router.get(LOGIN, (req, res, next) => {
  res.status(200).render(LOGIN_TEMPLATE, {
    referer: req.headers.referer
  });
});
router.post(LOGIN, passportAuthenticate);

router.get(LOGOUT, (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);

      return;
    }

    res.status(302).redirect(ROOT);
  });
});

module.exports = router;
