const express = require('express');

const checkAuthentication = require('../middlewares/authenticate');
const checkWhetherUserVoted = require('../middlewares/checkWhetherUserVoted');
const votingControllers = require('../controllers/voting.controllers');

const router = express.Router();

router.get('/new', checkAuthentication, (req, res) => {
  res.render('newvotes', { message: req.flash('errorMessage')})
});

router.post('/', checkAuthentication, votingControllers.registerVote);

router.delete('/', checkAuthentication, votingControllers.deleteVote)

router.get('/:id', votingControllers.renderVote);

router.post('/:id', checkAuthentication, checkWhetherUserVoted, votingControllers.registerCastingVote);

module.exports = router;
