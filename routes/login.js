const express = require('express');
const router = express();
const userController = require('../controllers/user.controller');

router.get('/', (req, res, next) => {
  res.render('login');
});
router.post('/', userController.loginLocal);

router.get('/github', userController.loginGithub);
router.get('/github/callback', userController.loginGithubCallback);

module.exports = router;
