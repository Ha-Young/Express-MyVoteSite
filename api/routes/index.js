const express = require('express');
const UserServices = require('../../services/user');
const VotingServices = require('../../services/voting');

const router = express.Router();
const votingServices = new VotingServices();
const userServices = new UserServices();

router.get('/', async (req, res, next) => {
  try {
    const votingList = await votingServices.findVoting(req.body);
    let votedList = [];

    if (req.session.user) {
      const { username } = req.session.user;
      res.locals.username = username;
      const user = await userServices.getUser(username);

      votedList = user.voted;
    }

    res.render('index', { votingList, votedList });
  } catch(err) {
    next(err);
  }
});

module.exports = router;
