const express = require('express');
const router = express.Router();
const controller = require('../controllers/votings.controller');
const { verifyUser } = require('../middlewares/verifyUser');
const { createVotingSchema } = require('../middlewares/validateInput');

router.get('/new', verifyUser, controller.getNewVotingPage);
router.post('/new', verifyUser, createVotingSchema, controller.createVoting);
router.get('/success', verifyUser);
router.get('/error', verifyUser);
router.delete('/delete/:voting_id', verifyUser, controller.deleteVoting);
router.get('/:voting_id', controller.getVotingDetailPage);
router.patch('/:voting_id', verifyUser, controller.addVote);

module.exports = router;
