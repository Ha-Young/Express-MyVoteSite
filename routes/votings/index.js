const express = require("express");
const router = express.Router();
const verifyAuth = require("../middlewares/verifyAuth");
const voteInputValidation = require("../middlewares/voteInputValidation");
const votingController = require("../../controllers/votingController");

router.get('/new', verifyAuth, function(req, res, next) {
  const displayName = req.user ? req.user.userName : null;

  res.render('newVoting', { title: 'New Voting', displayName, messages: req.flash("messages") }); // 여기 플래시 안먹음.
});

router.post('/new', verifyAuth, voteInputValidation, votingController.postNewVoting);


router.get('/:id', verifyAuth, function(req, res, next) {
  res.render('votings', { title: 'Voting' , messages: req.flash("messages")});
});






// router.get('/votings/success', function(req, res, next) {
//   res.render('voting-success', { title: 'Voting success' });
// });

// router.get('/votings/error', function(req, res, next) {
//   res.render('voting-error', { title: 'Voting error' });
// });

module.exports = router;
