const Vote = require('../models/Vote');

function renderVote(req, res) {
  res.status(200).render('voting', { title: 'login success' });
}

function renderNewVote(req, res) {
  res.render('newVote');
}

async function postNewVote(req, res, next) {
  const { title, expiredAt, options, description } = req.body;
  
  const formattedOptions = options.map(each => {
    return { 
      name: each,
      count: 0,
    };
  });

  const vote = new Vote({
    title,
    expiredAt,
    description,
    creatorId: req.user._id,
    creatorName: req.user.name,
    options: [...formattedOptions],
  });

  try {
    await vote.save();
    res.redirect('/home');
  } catch (error) {
    console.error(error);
  }
}

async function getVoteById(req, res, next) {
  const { id } = req.params;

  const vote = await Vote.findById(id);

  res.status(200).render('eachVote', { vote });
}

exports.renderVote = renderVote;
exports.renderNewVote = renderNewVote;
exports.postNewVote = postNewVote;
exports.getVoteById = getVoteById;
