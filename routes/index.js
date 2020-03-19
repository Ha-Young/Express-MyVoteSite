const express = require('express');
const router = express.Router();
const passport = require('passport');

const indexController = require('../controllers/indexController');
const pagePermissions = require('../middlewares/pagePermissions');

router.get('/', indexController.getMain);
router.get('/my-votings', pagePermissions.privatePage, indexController.getMyVotings);
router.get('/login', pagePermissions.publicPage, indexController.getLogin);
router.post('/login', pagePermissions.publicPage, indexController.postLogin, indexController.postPrePageLogin);
router.get('/logout', pagePermissions.privatePage, indexController.getLogout);
router.get('/signup', pagePermissions.publicPage, indexController.getSignup);
router.post('/signup', pagePermissions.publicPage, indexController.postSignup);

module.exports = router;
