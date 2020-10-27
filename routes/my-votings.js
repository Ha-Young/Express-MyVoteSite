const express = require('express');
const { authenticate } = require('./middlewares/authenticate');
const router = express.Router();

// 로그인 전 사용자 이용 불가
router.get('/', authenticate, (req, res, next) => {
  res.send('my votings');
});

module.exports = router;


// { isLoggedIn: !!req.user }