const express = require('express');
const router = express.Router();
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

router.get('/:voting_id',
  async (req, res, next) => {
    const votingId = req.params.voting_id;
    const voting = await Voting.findById(votingId).populate('createdBy').lean();
    // const userId = req.user._id;
    // let isAuthor = false;
    req.voting = voting;
    next();
  },
  votingController.checkIsAuthor
  // if(userId === String(voting.createdBy._id)) isAuthor = true;
  // res.render('votingDetail', { voting, isAuthor });
);

router.post('/:voting_id',
  checkAuth,
  userController.updateParticipateVoting,
  votingController.updateSelectedOption,
  votingController.checkIsAuthor
);

module.exports = router;
