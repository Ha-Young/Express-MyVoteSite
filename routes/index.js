const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const votingsController = require('../controllers/votings');
const requiresLogin = require('../controllers/middlewares/requiresLogin');

router.get('/', requiresLogin, votingsController.getAll);

router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup, authController.postLogin);

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/my-votings', votingsController.getAllMyVotings);

router.get('/logout', requiresLogin, authController.getLogout);

module.exports = router;
