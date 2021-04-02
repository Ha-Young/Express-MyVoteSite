const express = require('express');
const router = express.Router();
const votingsController = require('../controllers/votings.controller');
const { verifyUser } = require('../middlewares/verifyUser');
const { verifyVote } = require('../middlewares/verifyVote');
const { addUserInfo } = require('../middlewares/addUserInfo');
const { createVotingInputValidation } = require('../middlewares/validateInput');
const { validateVotingId } = require('../middlewares/validateVotingId');

router.get('/new', verifyUser, votingsController.renderNewVoting);
router.post('/new', verifyUser, createVotingInputValidation, votingsController.createVoting);
router.get('/success', verifyUser, votingsController.renderCreateVotingSuccess);
router.get('/error', verifyUser, votingsController.renderCreateVotingError);
router.delete('/delete/:voting_id', verifyUser, validateVotingId, votingsController.deleteVoting);
router.get('/:voting_id', addUserInfo, validateVotingId, votingsController.renderVotingDetail);
router.patch('/:voting_id', verifyVote, validateVotingId, votingsController.addVote);

module.exports = router;
