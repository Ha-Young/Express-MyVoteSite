const express = require('express');
const authenticate = require('../middlewares/authenticate');
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
      res.locals.username = username
      // 여기에서 사용자 쿼리 후 사용자가 한 보팅 id 리스트 템플릿에 넘겨주기
      const user = await userServices.getUser(username);

      votedList = user.voted;
    }

    res.render('index', { votingList, votedList });
  } catch(err) {
    next(err);
  }
});

module.exports = router;
