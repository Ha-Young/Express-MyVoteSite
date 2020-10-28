const express = require('express');

const controller = require('../../controller');
const {
  verifyAuthorization,
  setDefaultDate,
  serializeForm,
  validateVotingForm,
  saveVoting,
  getVoting,
  deleteVoting,
  creatorCheck,
  checkVotingUser,
  verifyVoting,
  saveUserPoll,
} = require('../../middleware');

const router = express.Router();

// controller middleware services 차이점
router.get(
  '/new',
  verifyAuthorization,
  setDefaultDate,
  controller.render('votings/new')
);

router.post(
  '/new',
  verifyAuthorization,
  serializeForm,
  validateVotingForm,
  saveVoting,
  controller.redirect('/')
);

router.get(
  '/:voting_id',
  getVoting,
  creatorCheck,
  checkVotingUser,
  controller.render('votings/card')
);

router.delete(
  '/:voting_id',
  deleteVoting,
  controller.json({ result: 'ok', }, 204)
);

router.put(
  '/:voting_id',
  verifyAuthorization,
  checkVotingUser,
  verifyVoting,
  saveUserPoll,
  controller.json({ result: 'ok', }, 201)
);

module.exports = router;
