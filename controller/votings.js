const { VotingService, } = require('../services/database');
const validator = require('../utils/validator');
const serializeForm = require('../utils/serializeForm');
const { DUPLICATED_VOTING_MESSAGE, } = require('../constants/errorMessage');

const votingService = new VotingService();

const getNewVotingPage = (req, res, next) => {
  res.render('votings/new');
};

const makeNewVoting = (req, res, next) => {
  const form = req.body;
  const userId = req.session.user.id;

  try {
    const serializedForm = serializeForm(form);
    serializedForm.creator = userId;

    validator.votingForm(serializedForm, async (err) => {
      if (err) {
        res.locals.message = err.message;
        return res.render('votings/new');
      }

      await votingService.createVoting(serializedForm);

      return res.redirect('/');
    });
  } catch (err) {
    console.error('🔥 controller: votings -> makeNewVoting', err);
    next(err);
  }
};

const getVotingByVotingId = async (req, res, next) => {
  const votingId = req.params.voting_id;
  const userId = req.session.user && req.session.user.id;

  try {
    const voting = await votingService.getVotingByVotingId(votingId);

    if (userId && voting.creator._id.toString() === userId) {
      res.locals.isCreator = true;
    }

    if (userId) {
      const isVoted = votingService.checkIfUserVoted({ userId, voting, });
      res.locals.isVoted = isVoted;
    }

    res.locals.voting = voting;
    res.render('votings/card');
  } catch (err) {
    console.error('🔥 controller: votings -> getVotingByVotingId', err);
    next(err);
  }
};

const deleteVoting = async (req, res, next) => {
  const votingId = req.params.voting_id;
  const userId = req.session.user.id;

  try {
    await votingService.deleteVoting({ userId, votingId, });

    res.status = 204;
    res.json({ result: 'ok', redirectUrl: '/', });
  } catch (err) {
    console.error('🔥 controller: votings -> deleteVoting', err);
    next(err);
  }
};

const vote = async (req, res, next) => {
  const userId = req.session.user.id;
  const votingId = req.params.voting_id;
  const { pollId, } = req.body;

  try {
    const voting= await votingService.getVotingByVotingId(votingId);
    const isVoted = votingService.checkIfUserVoted({ userId, voting, });

    if (isVoted) {
      res.message = DUPLICATED_VOTING_MESSAGE;
      res.render('votings/card');
    } else {
      await votingService.vote({ userId, pollId, });
      res.status(201);
      res.json({ result: 'ok', redirectUrl: req.originalUrl, });
    }
  } catch (err) {
    console.error('🔥 controller: votings -> vote', err);
    next(err);
  }
};

module.exports = {
  getNewVotingPage,
  makeNewVoting,
  getVotingByVotingId,
  deleteVoting,
  vote,
};
