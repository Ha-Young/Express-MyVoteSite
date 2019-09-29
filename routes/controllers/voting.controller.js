const Vote = require('../../models/Vote');
const dateFormat = require('dateformat');
const { failedToCreate, invalidOption } = require('../../constants/err-messages');

exports.getAllVoteById = async function(req, res, next) {
  try {
    const votes = await Vote.find({ creator_id: req.user._id });
    const now = new Date();
    const isInProgress = votes.map(vote => vote.end_date > now);
    const times = votes.map(vote => dateFormat(vote.end_date, 'yy-mm-dd hTT'));

    res.render(
      'main',
      {
        votes,
        isInProgress,
        times,
        myVote: true
      }
    );

  } catch(err) {
    next(err);
  }
};

exports.getOne = function(req, res, next) {
  try {
    const {
      vote,
      totalContributors,
      isInProgress,
      isCreator,
      counts
    } = res.locals;

    res.render(
      'vote',
      {
        vote,
        counts,
        totalContributors,
        isInProgress,
        isCreator,
        message: null
      }
    );

  } catch(err) {
    next(err);
  }
};

exports.update = async function(req, res, next) {
  try {
    const vote = await Vote.findById(req.params.id);
    const selectedOption = vote.options.find(option => option.id === req.body.option_id);

    if (!selectedOption) {
      return next(invalidOption);
    }

    selectedOption.voting_users.push(req.user._id);
    await vote.save();

    res.redirect(`/votings/${req.params.id}`);
  } catch(err) {
    next(err);
  }
};

exports.create = async function(req, res) {
  try {
    await new Vote({
      title: req.body.title,
      creator_id: req.user._id,
      end_date: req.body.end_date,
      options: req.body.options.map(option => ({ text: option }))
    }).save();

    res.redirect('/votings/success');
  } catch(err) {
    res.redirect('/votings/error');
  }
};

exports.delete = async function(req, res, next) {
  try {
    await Vote.findByIdAndDelete(req.params.id);

    res.redirect('/');
  } catch(err) {
    next(err);
  }
};

exports.typeForm = function(req, res) {
  const tomorrow = new Date().setDate(new Date().getDate() + 1);
  const minTime = dateFormat(tomorrow, "yyyy-mm-dd'T'HH:00");

  res.render('create-vote', { minTime });
};

exports.success = function(req, res) {
  res.render('success');
};

exports.error = function(req, res) {
  res.render('error', { message: failedToCreate });
};
