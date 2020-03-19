const Votes = require('../models/Votes');
const errors = require('../lib/errors');
const { getDisplayInfo } = require('../lib/helpers');

exports.registerVote = async (req, res, next) => {
  const { title, expires_at, ...options } = req.body;

  const expirationTime = new Date(expires_at).toISOString();
  const currentTime = new Date().toISOString();

  if (expirationTime < currentTime) {
    req.flash('errorMessage', '투표 만료시간은 현재 시간 이후여야 합니다.')
    return res.redirect('/votings/new');
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
    res.status(200).end();
    // res.status(200).send('투표가 성공적으로 삭제되었습니다!');
  } catch(err) {
    res.status(500).end();
    // next(new errors.GeneralError(err.message));
  }
};

exports.renderVote = async (req, res, next) => {
  try {
    const currentVote = await Votes.findById(req.params.id).populate('created_by').lean();
    const votes = await Votes.find().lean();
    const loggedInUser = req.user ? req.user : null;

    const expiredCounter = votes.reduce((counter, vote) => {
      if (vote.expired) counter++;
      return counter;
    }, 0);

    const voteDisplayInfo = getDisplayInfo(currentVote);

    res.render('vote', {
      vote: voteDisplayInfo,
      votes,
      loggedInUser,
      expiredCounter,
      errorMessage: req.flash('errorMessage')
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
    const { currentVote } = res.locals;
    let { select_options, total_voters } = currentVote;
    const selectedOption = select_options[selectedOptionIndex];

    selectedOption.vote_counter++;
    selectedOption.voter.push(req.user._id);
    total_voters++;

    await currentVote.updateOne({ select_options, total_voters });

    const { loggedInUser, loggedInUser: { votes_voted } } = res.locals;

    votes_voted.push(currentVote._id);

    await loggedInUser.updateOne({ votes_voted });

    res.redirect('/');
  } catch(err) {
    console.log(err);
    // something goes here...
  }
};
