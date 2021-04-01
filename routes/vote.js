const express = require('express');
const voteController = require('../controllers/vote.controller');
const { checkAuthenticated } = require('../middlewares/auth');
const router = express.Router();

router.get('/', voteController.renderVote);

router.get('/new', checkAuthenticated, voteController.renderNewVote);
router.post('/new', checkAuthenticated, voteController.postNewVote);

router.get('/:id', voteController.getVoteById);
router.put('/:id', checkAuthenticated, voteController.updateVoteById);
router.delete('/:id', voteController.deleteVoteById);

module.exports = router;
