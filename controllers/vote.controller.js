const createError = require('http-errors');

const Vote = require('../models/Vote');
const User = require('../models/User');
const { getFormattedCurrentDateTime } = require('../util/time');

const INITIAL_COUNT = 0;

function renderVote(req, res) {
  res.status(200).render('voting', { title: 'login success' });
}

function renderNewVote(req, res) {
  const minDateTime = getFormattedCurrentDateTime();

  res.status(200).render('newVote', { minDateTime });
}

async function postNewVote(req, res, next) {
  const { title, expiredAt, options, description } = req.body;

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
  });

  try {
    await vote.save();
    res.redirect('/home');
  } catch (error) {
    next(createError(500));
  }
}

async function getVoteById(req, res) {
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

  }

}

async function updateVoteById(req, res, next) {
  const { option } = req.body;
  const { _id: userId } = req.user;
  const { id: voteId } = req.params;

  const optionKey = `options.${option}`;
  
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
    await Vote.findOneAndDelete(id);
    await User.deleteCompletedVotes(id);

    res.status(200).redirect('/home');
  } catch (error) {

  }
}

async function renderMyVote(req, res) {
  try {
    const myVotes = await Vote.find({ creatorId: req.user.id }).lean();

    res.status(200).render('myVote', { allVotes: myVotes });
  } catch (error) {

  }
}

exports.renderVote = renderVote;
exports.renderNewVote = renderNewVote;

exports.postNewVote = postNewVote;
exports.getVoteById = getVoteById;
exports.updateVoteById = updateVoteById;
exports.deleteVoteById = deleteVoteById;
exports.renderMyVote = renderMyVote;
