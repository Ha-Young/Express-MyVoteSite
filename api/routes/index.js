const express = require('express');

const {
  isLoggedIn,
  isNotLoggedIn,
  setLocals,
  authenticate,
} = require('../middlewares/middlewares');
const {
  GETSignup,
  POSTSignup,
  GETLogin,
  POSTLogin,
  GETLogout,
} = require('./controllers/userController');
const {
  GETHome,
  GETExpireds,
  GETMyVotings,
} = require('./controllers/globalController');
const {
  ROUTES_GLOBAL,
  ROUTES_USER
} = require('../../config/constants');

const router = express.Router();

router.get(ROUTES_GLOBAL.HOME, setLocals, GETHome);
router.get(ROUTES_GLOBAL.EXPIRED, setLocals, GETExpireds);
router.get(ROUTES_GLOBAL.MYVOTINGS, isLoggedIn, setLocals, GETMyVotings);
router.get(ROUTES_USER.SIGNUP, isNotLoggedIn, GETSignup);
router.post(ROUTES_USER.SIGNUP, isNotLoggedIn, POSTSignup);
router.get(ROUTES_USER.LOGIN, isNotLoggedIn, GETLogin);
router.post(ROUTES_USER.LOGIN, authenticate, POSTLogin);
router.get(ROUTES_USER.LOGOUT, isLoggedIn, GETLogout);

module.exports = router;
