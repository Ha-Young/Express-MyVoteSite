const Votes = require('../models/Votes');
const errors = require('../lib/errors');
const { getDisplayInfo } = require('../lib/helpers');

exports.registerVote = async (req, res, next) => {
  const { title, expires_at, ...options } = req.body;

  const expirationTime = new Date(expires_at).toISOString();
  const currentTime = new Date().toISOString();

  if (expirationTime < currentTime) {
    return next(new errors.InvalidExpirationError());
  }

  const select_options = Object.values(options).map(option => ({
    description: option,
    vote_counter: 0,
    voter: []
  }));

  try {
    const createdVote = await Votes.create({
      title,
      select_options,
      total_voters: 0,
      created_by: req.user._id,
      expires_at: expirationTime,
      expired: false
    });

    const { loggedInUser, loggedInUser: { votes_created } } = res.locals;
    votes_created.push(createdVote._id);

    await loggedInUser.updateOne({ votes_created });

    res.redirect('/');
  } catch(err) {
    next(new errors.GeneralError(err.message));
  }
};

exports.deleteVote = async (req, res, next) => {
  try {
    const deletedVote = await Votes.findByIdAndRemove(req.body);

    let { loggedInUser, loggedInUser: { votes_created } } = res.locals;

    votes_created = votes_created.filter(voteId => {
      return voteId.toString() !== deletedVote._id.toString();
    });

    await loggedInUser.updateOne({ votes_created });

    res.redirect('/'); // 여기서 왜 에러가..?
  } catch(err) {
    next(new errors.GeneralError(err.message));
  }
};

exports.renderVote = async (req, res, next) => {
  try {
    const currentVote = await Votes.findById(req.params.id).populate('created_by').lean();
    const votes = await Votes.find().lean();
    const loggedInUser = req.user ? req.user : null;

    const voteDisplayInfo = getDisplayInfo(currentVote);

    res.render('vote', {
      vote: voteDisplayInfo,
      votes,
      loggedInUser
    });
  } catch(err) {
    next(new errors.NonExistingVoteError());
  }
};

exports.registerCastingVote = async (req, res, next) => {
  if (!req.user) {
    return res.redirect('/auth/login');
  }

  try {
    const selectedOptionIndex = Object.values(req.body)[0];
    const currentVote = await Votes.findById(req.params.id);
    const { select_options } = currentVote;
    const selectedOption = select_options[selectedOptionIndex];

    selectedOption.vote_counter++;
    selectedOption.voter.push(req.user._id);

    await currentVote.updateOne({ select_options });

    const { loggedInUser, loggedInUser: { votes_voted } } = res.locals;

    votes_voted.push(currentVote._id);

    await loggedInUser.updateOne({ votes_voted });

    res.redirect('/');
  } catch(err) {
    console.log(err);
    // something goes here...
  }
};
