const express = require("express");
const router = express.Router();
const verifyAuth = require("../middlewares/verifyAuth");
const voteInputValidation = require("../middlewares/voteInputValidation");
const votingController = require("../../controllers/votingController");

router.get('/new', verifyAuth, function(req, res, next) {
  const displayName = req.user ? req.user.userName : null;

  res.render('newVoting', { title: 'New Voting', displayName, messages: req.flash("messages") });
});

router.post('/new', verifyAuth, voteInputValidation, votingController.postNewVoting);

//verifyAuth??
router.get('/:id', votingController.getSelectedVoting);
router.put('/:id', verifyAuth, votingController.updateVoting);
router.delete('/:id', verifyAuth, votingController.deleteVoting);

// router.get('/votings/success', function(req, res, next) {
//   res.render('voting-success', { title: 'Voting success' });
// });

// router.get('/votings/error', function(req, res, next) {
//   res.render('voting-error', { title: 'Voting error' });
// });

module.exports = router;
