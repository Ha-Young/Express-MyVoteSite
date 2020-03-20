const express = require('express');
const router = express.Router();
const checkUser = require('../middlewares/checkUser');
const votingController = require('../controllers/voting.controller');

router.get('/new', checkUser, votingController.getVotingCreationPage);
router.get('/:id', votingController.getVotingDetail);
router.post('/new', checkUser, votingController.createVoting);
router.put('/:votingId/options/:optionId', checkUser, votingController.updateVoting);
router.delete('/:id', checkUser, votingController.removeVoting);

module.exports = router;
