const express = require('express');
const router = express.Router();
const votingController = require('../controllers/votings.controller');
const { verifyUser } = require('../middlewares/verifyUser');

router.get('/new', verifyUser, votingController.getNewVotingPage);
router.post('/new', verifyUser, votingController.createNewVoting);
router.get('/success', verifyUser);
router.get('/error', verifyUser);
router.get('/:id');

module.exports = router;
