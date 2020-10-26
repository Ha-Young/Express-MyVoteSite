const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');



router.get('/', function (req, res, next) {
  res.render('main', { data: 'welcome' });
});

router.get('/signup', authController.renderSignup);
router.post('/signup', authController.registerUser);

module.exports = router;
