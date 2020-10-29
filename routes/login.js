const express = require('express');
const router = express.Router();
const loginController = require('./controllers/login.controller');
const { isNotLoggedIn } = require('./middlewares/authenticate');

router.get('/', isNotLoggedIn, loginController.renderLogin);
router.post('/', loginController.AuthenticatePassport);

module.exports = router;
