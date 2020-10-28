const express = require('express');
const authenticate = require('../middlewares/authenticate');
const VotingServices = require('../../services/voting');

const router = express.Router();
const votingServices = new VotingServices();

router.get('/', async (req, res, next) => {
  try {
    const votingList = await votingServices.findVoting(req.body);

    if (req.session.user) {
      res.locals.username = req.session.user.username
    }

    res.render('index', { votingList });
  } catch(err) {
    next(err);
  }
});

module.exports = router;
