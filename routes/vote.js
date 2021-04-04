const express = require('express');
const voteController = require('../controllers/vote.controller');
const { checkLoggedIn } = require('../middlewares/auth');
const router = express.Router();

router.get('/new', checkLoggedIn, voteController.renderNewVote);
router.post('/new', checkLoggedIn, voteController.postNewVote);

router.get('/:id', voteController.getVoteById);
router.patch('/:id', checkLoggedIn, voteController.updateVoteById);
router.delete('/:id', voteController.deleteVoteById);

module.exports = router;
