const createError = require('http-errors');

const Vote = require('../models/Vote');
const User = require('../models/User');
const { getFormattedCurrentDateTime } = require('../util/getCurrentTime');
const { getRandomImage } = require('../util/getRandomImage');

const INITIAL_COUNT = 0;

// TODO: name
async function renderAllVotes(req, res) {
  try {
    await Vote.updateIsVotable();
    const votes = await Vote.find({}).lean();

    res.status(200).render('index', { votes });
  } catch (error) {
    console.error(error);
  }
}

function renderNewVote(req, res) {
  const currentDateTime = getFormattedCurrentDateTime();

  res.status(200).render('newVote', { currentDateTime });
}

async function renderMyVote(req, res) {
  try {
    const myVotes = await Vote.find({ creatorId: req.user.id }).lean();

    res.status(200).render('myVote', { allVotes: myVotes });
  } catch (error) {
    next(createError(500));
  }
}

async function postNewVote(req, res, next) {
  const { title, expiredAt, options, description, imgUrl } = req.body;

  const formattedOptions = options.reduce((acc, cur) => {
    acc[cur] = INITIAL_COUNT;

    return acc;
  }, {});

  const vote = new Vote({
    title,
    expiredAt,
    description,
    creatorId: req.user._id,
    creatorName: req.user.name,
    options: formattedOptions,
    imgUrl: imgUrl || getRandomImage(),
    creatorImgUrl: req.user.avatarUrl,
  });

  try {
    await vote.save();
    req.flash('info', 'Successfully created new vote!');
    res.status(301).redirect('/');
  } catch (error) {
    req.flash('info', 'Error on creating new vote, try again!');
    res.status(301).redirect('/');
  }
}

async function getVoteById(req, res, next) {
  const { id } = req.params;

  if (req.user) {
    res.locals.user = req.user;
  }

  try {
    let vote = await Vote.findById(id);

    if (!vote.isVotable && !vote.winner) {
      vote = await vote.makeResult();
    }

    const isCreator = req.user?._id.toString() === vote.creatorId.toString();

    res.status(200).render('eachVote', { vote, isCreator });
  } catch (error) {
    next(createError(500));
  }

}

async function updateVoteById(req, res, next) {
  const { option } = req.body;
  const { _id: userId, completedVotes } = req.user;
  const { id: voteId } = req.params;

  const optionKey = `options.${option}`;

  if (completedVotes.includes(voteId)) {
    req.flash('info', 'You already voted for this.');
    res.status(301).redirect(req.originalUrl);
    return;
  }

  try {
    const vote = await Vote.findByIdAndUpdate(voteId, {
      $inc: {
        [optionKey]: 1,
      },
    });

    await User.addCompletedVotesById(userId, voteId);

    await vote.save();
    res.status(301).redirect('/');
  } catch (error) {
    next(createError(500));
  }
}

async function deleteVoteById(req, res) {
  const { id } = req.params;

  try {
    await Vote.findByIdAndDelete(id);
    await User.deleteCompletedVotes(id);

    res.status(200).redirect('/');
  } catch (error) {
    next(createError(500));
  }
}

exports.renderAllVotes = renderAllVotes;
exports.renderNewVote = renderNewVote;
exports.renderMyVote = renderMyVote;

exports.postNewVote = postNewVote;
exports.getVoteById = getVoteById;
exports.updateVoteById = updateVoteById;
exports.deleteVoteById = deleteVoteById;
