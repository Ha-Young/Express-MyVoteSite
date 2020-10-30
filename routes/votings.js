const express = require('express');
const router = express.Router();

const VOTINGS = require('../constants/routes').VOTINGS;

const votingsController = require('../controllers/votings');
const requiresLogin = require('../controllers/middlewares/requiresLogin');
const findVotingById = require('../controllers/middlewares/findVotingById');

const validator = require('../controllers/validator/votings');

router.get(VOTINGS.NEW, requiresLogin, votingsController.getNewVoting);
router.post(
  VOTINGS.NEW,
  requiresLogin,
  validator.createVoting,
  votingsController.postNewVoting
);

router.param('id', findVotingById);

router.get(VOTINGS.BY_ID, votingsController.getVoting);
router.put(VOTINGS.BY_ID, requiresLogin, votingsController.updateVoting);
router.delete(VOTINGS.BY_ID, requiresLogin, votingsController.deleteVoting);

module.exports = router;
