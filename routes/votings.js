const express = require('express');
const router = express.Router();

router.get('/new', function (req, res, next) {
  res.render('new', {});
});

router.get('/success', function (req, res, next) {
  res.render('new', {});
});

router.get('/error', function (req, res, next) {
  res.render('new', {});
});

// router.get('/votings/:id', function (req, res, next) {
//   res.render('new', {});
// }); voting 개별 페이지

module.exports = router;
