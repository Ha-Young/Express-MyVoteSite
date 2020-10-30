const express = require('express');
const router = express.Router();

const votingsController = require('./controllers/votings.controller');
const { verifyLoggedIn } = require('./middlewares/auth');

router.get('/new', verifyLoggedIn, votingsController.renderNew);
router.post('/new', votingsController.createVoting);
router.get('/:voting_id', votingsController.getVotingDetail);
router.put('/:voting_id', votingsController.updateOptionVoter);
router.delete('/:voting_id', votingsController.deleteVoting);

module.exports = router;
