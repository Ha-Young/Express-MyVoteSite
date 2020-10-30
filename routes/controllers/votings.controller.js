const VoteService = require('../../services/VoteService');
const { SERVICE_ERROR_CODE } = require('../../services/ActionCreator');
const { ROUTES, VIEWS, SUCCESS, ERROR, CALLBACK_URI } = require('../../config/constants');

const { formatISO, addHours } = require('date-fns');

exports.getNewVote = function getNewVote(req, res, next) {
  const {
    session: { user }
  } = req;
  const presentTime = formatISO(addHours(new Date(), 1)).slice(0, 14) + '00';
  res.status(200).render(VIEWS.NEW_VOTE, { user, time: presentTime });
};

exports.postNewVote = async function postNewVote(req, res, next) {
  const {
    body: vote,
    session: { user }
  } = req;

  try {
    if (!Array.isArray(vote.itemList) || vote.itemList.length <= 1) {
      req.flash(ERROR, 'Failed creating item must be at least 2');
      return res.redirect(ROUTES.HOME);
    }

    const voteInstance = new VoteService(vote);
    await voteInstance.createNewVote(user);

    req.flash(SUCCESS, 'Succeed creating new vote!');
    res.redirect(ROUTES.HOME);
  } catch (error) {
    next(error);
  }
};

exports.getVote = async function getVote(req, res, next) {
  res.clearCookie(CALLBACK_URI);

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
        return res.redirect(ROUTES.HOME);
      case SUCCESS:
        if (session && session.user) {
          isAuthor = payload.author._id.equals(session.user._id);
          isParticipated = payload.participatedUser.find((user) =>
            user._id.equals(session.user._id)
          );
        }
        return res.status(200).render(VIEWS.VOTE_DETAIL, {
          user: session.user,
          vote: payload,
          isAuthor,
          isParticipated
        });
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
        return res.status(200).json(body);
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
    res.status(200).json({ result: SUCCESS });
  } catch (error) {
    next(error);
  }
};
