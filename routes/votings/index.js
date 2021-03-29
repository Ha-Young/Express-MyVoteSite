const express = require("express");
const router = express.Router();

router.get('/votings/:id', function(req, res, next) {
  res.render('voting', { title: 'Voting' });
});

router.get('/votings/new', function(req, res, next) {
  res.render('voting-new', { title: 'New Voting' });
});

// router.get('/votings/success', function(req, res, next) {
//   res.render('voting-success', { title: 'Voting success' });
// });

// router.get('/votings/error', function(req, res, next) {
//   res.render('voting-error', { title: 'Voting error' });
// });

module.exports = router;
