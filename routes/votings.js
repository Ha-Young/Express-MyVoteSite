const express = require('express');
const router = express.Router();
const votingsController = require('../controllers/votingsController');

router.get('/new', votingsController.getNewVoting);
router.post('/new', votingsController.postNewVoting);
router.get('/:voting_id', votingsController.getDetailVoting);
router.get('/:voting_id/remove', votingsController.getVotingRemove);
router.post('/:voting_id/success', votingsController.postVotingComplete);

module.exports = router;
