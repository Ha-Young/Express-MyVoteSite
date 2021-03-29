const express = require('express');
const router = express();
const isloggedIn = require('./middleware/isLoggedIn');
const loginController = require('./controllers/login.controller');

router.get('/', loginController.get);
router.post('/', loginController.postLocal);

router.get('/github', loginController.getGithub);
router.get('/github/callback', loginController.callbackGithub);

module.exports = router;
