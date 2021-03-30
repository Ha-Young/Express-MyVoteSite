const express = require('express');
const router = express.Router();
const votingController = require('../controllers/votings.controller');
const { verifyUser } = require('../middlewares/verifyUser');
const { createVotingSchema } = require('../middlewares/validateInput');

router.get('/new', verifyUser, votingController.getNewVotingPage);
router.post('/new', verifyUser, createVotingSchema, votingController.createNewVoting);
router.get('/success', verifyUser);
router.get('/error', verifyUser);
router.get('/:id');

module.exports = router;
