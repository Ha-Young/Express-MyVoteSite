const express = require('express');
const {
  isLoggedIn,
  isNotLoggedIn,
  setLocals,
  getAuthenticated,
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

const router = express.Router();

router.get('/', setLocals, GETHome);
router.get('/expired', setLocals, GETExpireds);
router.get('/my-votings', isLoggedIn, setLocals, GETMyVotings);
router.get('/signup', isNotLoggedIn, GETSignup);
router.post('/signup', isNotLoggedIn, POSTSignup);
router.get('/login', isNotLoggedIn, GETLogin);
router.post('/login', getAuthenticated, POSTLogin);
router.get('/logout', isLoggedIn, GETLogout);

module.exports = router;
