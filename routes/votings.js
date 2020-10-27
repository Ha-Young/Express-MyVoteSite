const express = require('express');
const router = express.Router();

const VOTINGS = require('../constants/routes').VOTINGS;

const votingsController = require('../controllers/votings');
const requiresLogin = require('../controllers/middlewares/requiresLogin');

router.get(VOTINGS.NEW, requiresLogin, votingsController.getNewVoting);
router.post(VOTINGS.NEW, requiresLogin, votingsController.postNewVoting);

router.post(VOTINGS.SUCCESS, votingsController.postVotingSuccess);

router.post(VOTINGS.ERROR, votingsController.postVotingError);

router.get(VOTINGS.BY_ID, votingsController.getVoting);
router.post(VOTINGS.BY_ID, votingsController.postVoting);

module.exports = router;
