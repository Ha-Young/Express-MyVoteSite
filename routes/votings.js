const express = require('express');
const router = express.Router();
const {getProblemList} = require('./controllers/authenticate');
const {getVoteInfo, viewMyVote, viewmakeVote, makeVote, vote, deleteVote} = require('./controllers/votings.controllers');


const { ensureAuthenticated } = require('./middleware/auth');


router.get('/new', ensureAuthenticated, viewmakeVote);
router.post('/new', makeVote ,getProblemList);

router.get('/', ensureAuthenticated, viewMyVote);

router.delete('/delete/:id', deleteVote);

router.get('/:id', ensureAuthenticated, getVoteInfo);

router.post('/:id', ensureAuthenticated, vote);

module.exports = router;
