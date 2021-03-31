const Vote = require('../models/Vote');

function renderVote(req, res) {
  res.status(200).render('voting', { title: 'login success' });
}

function renderNewVote(req, res) {
  res.render('newVote');
}

async function postNewVote(req, res) {
  const { title, expiredAt, options, description } = req.body;

  let formattedOptions = options.reduce((acc, cur) => {
    acc[cur] = 0;
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
    console.error(error);
  }
}

async function getVoteById(req, res) {
  const { id } = req.params;

  const vote = await Vote.findById(id);

  res.status(200).render('eachVote', { vote });
}

async function updateVoteById(req, res) {
  const { option } = req.body;
  const { id } = req.params;

  const optionKey = `options.${option}`;

  const vote = await Vote.findByIdAndUpdate(id, { 
    $inc: {
      [optionKey]: 1,
    },
  });

  await vote.save();
  res.status(301).redirect('/');
}

exports.renderVote = renderVote;
exports.renderNewVote = renderNewVote;
exports.postNewVote = postNewVote;
exports.getVoteById = getVoteById;
exports.updateVoteById = updateVoteById;
