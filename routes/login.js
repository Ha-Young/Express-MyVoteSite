const express = require('express');
const router = express();
const userController = require('../controllers/user.controller');

router.get('/', (req, res, next) => {
  try {
    res.status(200).render('login');
  } catch (e) {
    next(e);
  }
});
router.post('/', userController.loginLocal);

router.get('/github', userController.loginGithub);
router.get('/github/callback', userController.loginGithubCallback);

module.exports = router;
