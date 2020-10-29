const express = require('express');
const router = express.Router();

const GLOBAL = require('../constants/routes');

const authController = require('../controllers/auth');
const votingsController = require('../controllers/votings');
const requiresLogin = require('../controllers/middlewares/requiresLogin');

router.get(GLOBAL.HOME, votingsController.getAll);

router.get(GLOBAL.SIGNUP, authController.getSignup);
router.post(GLOBAL.SIGNUP, authController.postSignup, authController.postLogin);

router.get(GLOBAL.LOGIN, authController.getLogin);
router.post(GLOBAL.LOGIN, authController.postLogin);

router.get(GLOBAL.GOOGLE_LOGIN, authController.getGoogleLogin);
router.get(
  GLOBAL.GOOGLE_LOGIN_CALLBACK,
  authController.getGoogleCallback,
  authController.successGoogleLogin
);

router.get(GLOBAL.MY_VOTINGS, requiresLogin, votingsController.getAllMyVotings);

router.get(GLOBAL.LOGOUT, requiresLogin, authController.getLogout);

module.exports = router;
