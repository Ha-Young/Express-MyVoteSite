const express = require('express');
const router = express.Router();
const controller = require('../controllers/votings.controller');
const { verifyUser } = require('../middlewares/verifyUser');
const { verifyVote } = require('../middlewares/verifyVote');
const { addUserInfo } = require('../middlewares/addUserInfo');
const { createVotingInputValidation } = require('../middlewares/validateInput');

router.get('/new', verifyUser, controller.renderNewVoting);
router.post('/new', verifyUser, createVotingInputValidation, controller.createVoting);
router.get('/success', verifyUser, controller.renderCreateVotingSuccess);
router.get('/error', verifyUser, controller.renderCreateVotingError);
router.delete('/delete/:voting_id', verifyUser, controller.deleteVoting);
router.get('/:voting_id', addUserInfo, controller.renderVotingDetail);
router.patch('/:voting_id', verifyVote, controller.addVote);

module.exports = router;
