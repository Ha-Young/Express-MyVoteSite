const express = require('express');
const router = express();
const loginController = require('./controllers/login.controller');

router.get('/', (req, res, next) => {
  res.render('login');
});
router.post('/', loginController.localPost);

router.get('/github', loginController.githubGet);
router.get('/github/callback', loginController.githubCallback);

module.exports = router;
