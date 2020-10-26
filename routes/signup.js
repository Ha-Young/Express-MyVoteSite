const express = require('express');
const router = express.Router();

// 로그인 후 사용자 이용 불가
router.get('/', (req, res, next) => {
  res.send('signup');
});

module.exports = router;
