const VoteService = require('../../services/VoteService');
const { SERVICE_ERROR_CODE } = require('../../services/ActionCreator');
const { SUCCESS, ERROR } = require('../../constants');

const { formatISO } = require('date-fns');

exports.getNewVote = function getNewVote(req, res, next) {
  const {
    session: { user }
  } = req;
  const presentTime = formatISO(new Date()).slice(0, 16);
  res.status(200).render('newVote', { user, time: presentTime });
};

exports.postNewVote = async function postNewVote(req, res, next) {
  const {
    body: vote,
    session: { user }
  } = req;

  try {
    if (!vote.itemList || (vote.itemList && vote.itemList.length <= 1)) {
      req.flash(ERROR, 'Failed creating item must be at least 2');
      return res.redirect('/');
    }

    const voteInstance = new VoteService(vote);
    await voteInstance.createNewVote(user);

    req.flash(SUCCESS, 'Succeed creating new vote!');
    req.app.locals.messages = req.flash('succeed');
    res.redirect('/');
  } catch (error) {
    next(error);
  }
};

exports.getVote = async function getVote(req, res, next) {
  res.clearCookie('callbackURI');

  const {
    params: { id: vote_id },
    session
  } = req;
  let isAuthor = false;
  let isParticipated;

  try {
    const { type, payload } = await VoteService.findVote(vote_id);

    switch (type) {
      case SERVICE_ERROR_CODE._10:
        req.flash(ERROR, payload.message);
        return res.redirect('/');
      case SUCCESS:
        if (session && session.user) {
          isAuthor = session.user._id === payload.author._id.toString();
          isParticipated = payload.participatedUser.find(
            (user) => user._id.toString() === session.user._id
          );
        }
        return res
          .status(200)
          .render('voteDetail', { user: session.user, vote: payload, isAuthor, isParticipated });
    }
  } catch (error) {
    next(error);
  }
};

exports.postVote = async function postVote(req, res, next) {
  const {
    params: { id: vote_id },
    body,
    session: { user }
  } = req;

  try {
    const { type, payload } = await VoteService.castVote(vote_id, user, body);

    switch (type) {
      case SERVICE_ERROR_CODE._11:
        req.flash(ERROR, payload.message);
      case SUCCESS:
        req.flash(SUCCESS, 'Succeed voting!');
      default:
        return res.redirect(`/votings/${vote_id}`);
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteVote = async function deleteVote(req, res, next) {
  try {
    const {
      params: { id: vote_id }
    } = req;
    await VoteService.deleteVote(vote_id);
    req.flash(SUCCESS, 'Succeed delete');
    res.redirect('/');
  } catch (error) {
    next(error);
  }
};
