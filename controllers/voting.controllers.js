const Votes = require('../models/Votes');
const errors = require('../lib/errors');
const { makeDisplayInfo } = require('../lib/helpers');

exports.registerVote = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { title, expires_at, ...options } = req.body;

  const expirationTime = new Date(expires_at).toISOString();
  const currentTime = new Date().toISOString();

  if (expirationTime < currentTime) {
    return next(new errors.InvalidExpirationError());
  }

  const selectOptionList = Object.values(options).map(option => ({
    description: option,
    vote_counter: 0,
    voter: []
  }));

  const counter = await Votes.estimatedDocumentCount();

  try {
    await Votes.create({
      title,
      vote_id: counter + 1,
      select_options: selectOptionList,
      created_by: userId,
      expires_at: expirationTime
    });

    res.redirect('/');
  } catch(err) {
    next(new errors.GeneralError(err.message));
  }
};

exports.renderVote = async (req, res, next) => {
  const { id: voteId } = req.params;

  try {
    const currentVote = await Votes.findOne({ vote_id: voteId }).populate('created_by').lean();

    const voteInfoForDisplay = makeDisplayInfo(currentVote);

    res.render('vote', {
      vote: voteInfoForDisplay,
      createdBy: voteInfoForDisplay.created_by.toString(),
      currentUser: req.user._id
    });
  } catch(err) {
    next(new errors.GeneralError(err.message));
  }
};

exports.deleteVote = async (req, res, next) => {
  try {
    const targetVoteId = req.body;
    await Votes.findOneAndDelete({ vote_id: targetVoteId });

    res.redirect('/'); // 여기서 왜 에러가..?
  } catch(err) {
    next(new errors.GeneralError(err.message));
  }
};
