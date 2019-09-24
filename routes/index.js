const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login'})
});

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Register'})
})

module.exports = router;
