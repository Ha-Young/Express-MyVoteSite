const express = require('express');
const router = express.Router();
const loginController = require('./controllers/login.controller');
const { isNotLoggedIn } = require('./middlewares/authenticate');

router.get('/', isNotLoggedIn, (req, res, next) => {
  res.render('login');
});

router.post('/', loginController.AuthenticatePassport);

module.exports = router;