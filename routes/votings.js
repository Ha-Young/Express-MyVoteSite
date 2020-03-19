const express = require('express');
const router = express.Router();

const votingsController = require('../controllers/votingsController');
const pagePermissions = require('../middlewares/pagePermissions');

router.get('/new', pagePermissions.privatePage, votingsController.getNewVoting);
router.post('/new', pagePermissions.privatePage, votingsController.postNewVoting);
router.get('/:voting_id', votingsController.getDetailVoting);
router.post('/:voting_id/success', pagePermissions.privatePage, votingsController.postVotingComplete);
router.get('/:voting_id/remove', pagePermissions.privatePage, votingsController.getVotingRemove);

module.exports = router;
