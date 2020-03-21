const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/authenticate');
const votingController = require('../controllers/voting.controllers');
const userController = require('../controllers/user.controllers');

router.get('/new',
  checkAuth,
  (req, res, next) => {
    res.render('newVoting');
  }
);

router.post('/new',
  checkAuth,
  votingController.create,
  userController.updateRegisterVoting
);

router.get('/:voting_id',
  votingController.getbyId,
  userController.checkRespondent,
  votingController.checkIsAuthor
);

router.post('/:voting_id',
  checkAuth,
  userController.updateParticipateVoting,
  votingController.updateSelectedOption,
  votingController.checkIsAuthor
);

module.exports = router;
