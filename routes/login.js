const express = require('express');
const router = express();
const loginController = require('./controllers/login.controller');

router.get('/', loginController.get);
router.post('/', loginController.postLocal);

router.get('/github', loginController.getGithub);
router.get('/github/callback', loginController.callbackGithub);

module.exports = router;
