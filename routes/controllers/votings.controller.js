const VoteService = require('../../services/VoteService');
const { SERVICE_ERROR_CODE } = require('../../services/ActionCreator');
const { ROUTES, VIEWS, MESSAGES, SUCCESS, ERROR, CALLBACK_URI } = require('../../config/constants');

const { formatISO, addHours } = require('date-fns');

exports.renderNewVote = function renderNewVote(req, res, next) {
  const {
    session: { user }
  } = req;
  const presentTime = formatISO(addHours(new Date(), 1)).slice(0, 14) + '00';
  res.status(200).render(VIEWS.NEW_VOTE, { user, time: presentTime });
};

exports.createNewVote = async function createNewVote(req, res, next) {
  const {
    body: vote,
    session: { user }
  } = req;

  try {
    if (!Array.isArray(vote.itemList) || vote.itemList.length <= 1) {
      req.flash(ERROR, MESSAGES.ERROR_CREATE_NEW_VOTE);
      return res.redirect(ROUTES.HOME);
    }

    const voteInstance = new VoteService(vote);
    await voteInstance.createNewVote(user);

    req.flash(SUCCESS, MESSAGES.SUCCESS_CRAETE_NEW_VOTE);
    res.redirect(ROUTES.HOME);
  } catch (error) {
    next(error);
  }
};

exports.renderVoteDetail = async function renderVoteDetail(req, res, next) {
  res.clearCookie(CALLBACK_URI);

  const {
    params: { id: vote_id },
    session
  } = req;
  let isAuthor = false;
  let isParticipated = false;

  try {
    const { status, payload } = await VoteService.findVote(vote_id);

    switch (status) {
      case SERVICE_ERROR_CODE._10:
        req.flash(ERROR, payload.message);
        return res.redirect(ROUTES.HOME);
      case SUCCESS:
        if (session && session.user) {
          isAuthor = payload.author._id.equals(session.user._id);
          isParticipated = payload.participatedUser.some((user) =>
            user._id.equals(session.user._id)
          );
        }
        console.log(isParticipated);
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

exports.castVote = async function castVote(req, res, next) {
  const {
    params: { id: vote_id },
    body,
    session: { user }
  } = req;

  try {
    const { status, payload } = await VoteService.castVote(vote_id, user, body);

    switch (status) {
      case SERVICE_ERROR_CODE._11:
        req.flash(ERROR, payload.message);
      case SUCCESS:
        req.flash(SUCCESS, MESSAGES.SUCCESS_VOTING);
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
