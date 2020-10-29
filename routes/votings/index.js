const express = require('express');

const controller = require('../../controller');
const { authenticateUser, } = require('../../middleware');

const router = express.Router();

router.get('/new', authenticateUser, controller.votings.getNewVotingPage);
router.post('/new', authenticateUser, controller.votings.makeNewVoting);
router.get('/:voting_id', controller.votings.getVotingByVotingId);
router.delete('/:voting_id', authenticateUser, controller.votings.deleteVoting);
router.put('/:voting_id', authenticateUser, controller.votings.vote);

module.exports = router;
