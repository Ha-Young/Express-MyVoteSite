const express = require('express');
const router = express.Router();

const ROUTES = require('../constants/routes');

const authController = require('../controllers/auth');
const votingsController = require('../controllers/votings');
const requiresLogin = require('../controllers/middlewares/requiresLogin');

const validator = require('../controllers/validator/auth');

router.get(ROUTES.HOME, votingsController.getAll);

router.get(ROUTES.SIGNUP, authController.getSignup);
router.post(
  ROUTES.SIGNUP,
  validator.signup,
  authController.postSignup,
  authController.postLogin
);

router.get(ROUTES.LOGIN, authController.getLogin);
router.post(ROUTES.LOGIN, authController.postLogin);

router.get(ROUTES.GOOGLE_LOGIN, authController.getGoogleLogin);
router.get(
  ROUTES.GOOGLE_LOGIN_CALLBACK,
  authController.getGoogleCallback,
  authController.successGoogleLogin
);

router.get(ROUTES.MY_VOTINGS, requiresLogin, votingsController.getAllMyVotings);

router.get(ROUTES.LOGOUT, requiresLogin, authController.getLogout);

module.exports = router;
