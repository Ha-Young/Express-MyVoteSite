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

    const { voted } = await votingServices.findUserVotedVotings(username);

    const votingsUserCreated = await votingServices.findVoting({ author: id });

    res.render('my_votings', {
      userId: id,
      votingsUserVoted: voted,
      votingsUserCreated
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:votingId', async (req, res) => {
  const voting = await votingServices.findVoting({ _id: req.params.votingId });

  let locals = {};

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

    const result = await userServices.hasVoted(id, req.params.votingId);

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
    const result = await votingServices.createVoting(req.body);

    if (result) {
      res.json({
        success: true
      });
    } else {
      res.json({
        success: false
      });
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:votingId/:candidateId', async (req, res, next) => {
  const { votingId, candidateId } = req.params;
  const voterId = req.session.user.id;

  try {
    const result = await votingServices.updateVoting(votingId, candidateId, voterId);

    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.delete('/:votingId', async (req, res, next) => {
  const { votingId } = req.params;

  try {
    const result = await votingServices.deleteVoting(votingId);

    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
