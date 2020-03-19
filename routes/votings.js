const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Voting = require('../models/Voting');
const checkAuth = require('../middlewares/authenticate');
const votingController = require('../controllers/voting.controllers');
const userController = require('../controllers/user.controllers');

router.get('/new', checkAuth, (req, res, next) => {
  res.render('newVoting');
});

router.post('/new',
  checkAuth,
  votingController.create,
  userController.updateRegisterVoting
);

router.get('/:voting_id', async (req, res, next) => {
  const votingId = req.params.voting_id;
  const voting = await Voting.findById(votingId).populate('createdBy').lean();
  res.render('votingDetail', { voting });
})

router.post('/:voting_id',
  checkAuth,
  userController.updateParticipateVoting,
  votingController.updateSelectedOption
);

module.exports = router;
