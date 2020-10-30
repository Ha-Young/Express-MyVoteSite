const express = require('express');
const VotingServices = require('../../services/voting');
const UserServices = require('../../services/user');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();
const votingServices = new VotingServices();
const userServices = new UserServices();

router.get('/new', authenticate, (req, res) => {
  if (req.session.user) {
    res.locals.username = req.session.user.username;
    res.locals.userId = req.session.user.id;
  }

  res.render('new_voting');
});

router.get('/my-votings', authenticate, async (req, res, next) => {
  try {
    const { id, username } = req.session.user;
    res.locals.username = username;

    // populate로 유저가 가지고 있는 모든 투표 데이터 가져오기
    const { voted } = await votingServices.findUserVotings(username);

    console.log(voted);

    res.render('my_votings', {
      userId: id,
      userVotings: voted
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:votingId', async (req, res) => {
  const voting = await votingServices.findVoting({ _id: req.params.votingId });

  let locals = {};

  // 찾지 못한 경우
  if (voting.length === 0) {
    locals = {
      subject: '못찾았어요..'
    };
  } else {
    const { subject, author, description, candidates } = voting[0];
    locals = {
      subject: JSON.stringify(subject),
      author,
      description,
      candidates: JSON.stringify(candidates)
    };
  }

  if (req.session.user) {
    const { id, username } = req.session.user;

    const result = await userServices.hasVoted(id, req.params.votingId); // vote를 가지고 있는지

    if (result) {
      res.locals.hasVoted = true;
    }

    res.locals.username = username;
    res.locals.userId = id;
  }

  res.render('voting', locals);
});

router.post('/new', async (req, res, next) => {
  try {
    await votingServices.createVoting(req.body);

    res.redirect('/votings/new');
  } catch (err) {
    next(err);
  }
});

router.put('/:votingId/:candidateId', async (req, res, next) => {
  const { votingId, candidateId } = req.params;
  const voterId = req.session.user.id;

  try {
    const result = await votingServices.updateVoting(votingId, candidateId, voterId);

    console.log(result);

    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.delete('/:votingId', async (req, res, next) => {
  const { votingId } = req.params;

  try {
    await votingServices.deleteVoting(votingId);

  } catch (err) {
    next(err);
  }
});

module.exports = router;
