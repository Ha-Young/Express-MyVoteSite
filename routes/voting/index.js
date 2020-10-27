const express = require('express');

const controller = require('../../controller');
const serializeForm = require('../../middleware/serializeForm');
const validateVotingForm = require('../../middleware/validateVotingForm');
const saveVoting = require('../../middleware/saveVoting');

const router = express.Router();

router.get('/', controller.render('./voting'));
router.get('/new', controller.render('./voting/new'));
router.post(
  '/new',
  serializeForm,
  validateVotingForm,
  saveVoting,
  controller.redirect('/')
);

module.exports = router;
