const express = require('express');
const router = express.Router();
const controller = require('../controllers/votings.controller');
const { verifyUser } = require('../middlewares/verifyUser');
const { verifyVote } = require('../middlewares/verifyVote');
const { addUserInfo } = require('../middlewares/addUserInfo');
const { createVotingSchema } = require('../middlewares/validateInput');

router.get('/new', verifyUser, controller.getNewVotingPage);
router.post('/new', verifyUser, createVotingSchema, controller.createVoting);
router.get('/success', verifyUser, controller.success);
router.get('/error', verifyUser, controller.error);
router.delete('/delete/:voting_id', verifyUser, controller.deleteVoting);
router.get('/:voting_id', addUserInfo, controller.getVotingDetailPage);
router.patch('/:voting_id', verifyVote, controller.addVote);

module.exports = router;
