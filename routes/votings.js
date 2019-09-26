const express = require('express');
const router = express.Router();
const {getAllVoteInfo, getVoteInfo, viewMyVote, viewmakeVote, makeVote, vote, deleteVote} = require('./controllers/votings.controllers');

const { ensureGuest } = require('./middleware/auth');

router.get('/success', ensureGuest, (req,res,next) => {
  res.render('success', {name : req.user.name});
});

router.get('/new', ensureGuest, viewmakeVote);
router.post('/new', ensureGuest, makeVote ,getAllVoteInfo);

router.get('/', ensureGuest, viewMyVote);

router.delete('/delete/:id', deleteVote);

router.get('/:id', ensureGuest, getVoteInfo);
router.post('/:id', ensureGuest, vote);

module.exports = router;
