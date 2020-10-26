const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);

router.get('/', function (req, res, next) {
  res.render('main', { data: 'welcome' });
});

module.exports = router;
