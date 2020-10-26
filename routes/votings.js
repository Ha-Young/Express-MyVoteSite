const express = require('express');
const router = express.Router();

router.get('/:id', (req, res, next) => {
  res.send('voting details');
});

// 이하 로그인 전 사용자 이용 불가
router.get('/new', (req, res, next) => {
  res.send('make new voting');
});
router.post('/new', (req, res, next) => {
  res.send('new voting created');
});
router.get('/success', (req, res, next) => {
  res.send('success, new voting created');
});
router.get('/error', (req, res, next) => {
  res.send('error, new voting not created');
});

module.exports = router;
