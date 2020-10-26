const express = require('express');
const router = express.Router();

const VOTINGS = require('../constants/routes').VOTINGS;

const votingsController = require('../controllers/votings');
const requiresLogin = require('../controllers/middlewares/requiresLogin');

router.get(VOTINGS.BY_ID, requiresLogin, votingsController.getVoting);
router.post(VOTINGS.BY_ID, requiresLogin, votingsController.postVoting);

router.get(VOTINGS.NEW, requiresLogin, votingsController.getNewVoting);
router.post(VOTINGS.NEW, requiresLogin, votingsController.postNewVoting);

router.post(VOTINGS.SUCCESS, requiresLogin, votingsController.postVotingSuccess);

router.post(VOTINGS.ERROR, requiresLogin, votingsController.postVotingError);

module.exports = router;
