var express = require('express');
var router = express.Router();

const authController = require('./controllers/authController');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', flashes: req.flash() });
});

router.get('/register', authController.registerForm);
router.post('/register',
  authController.validateRegister,
  authController.register
);

router.get('/login',authController.loginForm);
router.post('/login', authController.login);

router.get('/logout', authController.logout);


module.exports = router;
