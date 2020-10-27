const express = require('express');

const controller = require('../../controller');
const verifyAuthorization = require('../../middleware/verifyAuthorization');
const setDefaultDate = require('../../middleware/setDefaultDate');
const serializeForm = require('../../middleware/serializeForm');
const validateVotingForm = require('../../middleware/validateVotingForm');
const saveVoting = require('../../middleware/saveVoting');
const getVoting = require('../../middleware/getVoting');
const verifyVoting = require('../../middleware/verifyVoting');
const saveUserPoll = require('../../middleware/saveUserPoll');

const router = express.Router();

router.get('/new', verifyAuthorization, setDefaultDate, controller.render('votings/new'));
router.post(
  '/new',
  verifyAuthorization,
  serializeForm,
  validateVotingForm,
  saveVoting,
  controller.redirect('/')
);
router.get('/:voting_id',
  getVoting,
  controller.render('votings/card')
);
router.get('/:voting_id/polls/:poll_id',
  verifyAuthorization,
  verifyVoting,
  saveUserPoll,
  controller.redirectBefore()
);

module.exports = router;