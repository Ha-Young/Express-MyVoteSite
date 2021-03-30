const express = require("express");
const router = express.Router();
const verifyAuth = require("../middlewares/verifyAuth");


router.get('/new', verifyAuth, function(req, res, next) {
  const displayName = req.user ? req.user.userName : null;

  res.render('newVoting', { title: 'New Voting', displayName });
});


router.get('/:id', verifyAuth, function(req, res, next) {
  res.render('voting', { title: 'Voting' });
});

// router.get('/votings/success', function(req, res, next) {
//   res.render('voting-success', { title: 'Voting success' });
// });

// router.get('/votings/error', function(req, res, next) {
//   res.render('voting-error', { title: 'Voting error' });
// });

module.exports = router;
