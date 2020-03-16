const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.getMain);
router.get('/login', indexController.getLogin);
router.post('/login', indexController.postLogin);
router.get('/signup', indexController.getSignup);
router.post('/signup', indexController.postSignup);

module.exports = router;
