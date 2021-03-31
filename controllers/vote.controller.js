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
    // TODO: ZERO - constant
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

  if (req.user) {
    res.locals.user = req.user;
  }

  try {
    let vote = await Vote.findById(id);
    
    if (!vote.isVotable) {
      vote = await vote.makeResult();
    }
    
    const isCreator = req.user?._id.toString() === vote.creatorId.toString();

    res.status(200).render('eachVote', { vote, isCreator });
  } catch (error) {

  }

}

async function updateVoteById(req, res) {
  const { option } = req.body;
  const { id } = req.params;

  const optionKey = `options.${option}`;

  try {
    const vote = await Vote.findByIdAndUpdate(id, { 
      $inc: {
        [optionKey]: 1,
      },
    });
  
    await vote.save();
    res.status(301).redirect('/');
  } catch (error) {

  }
}

async function deleteVote(req, res) {
  const { id } = req.params;

  try {
    await Vote.findOneAndDelete(id);
    res.status(200).redirect('/home');
  } catch (error) {

  }
}

exports.renderVote = renderVote;
exports.renderNewVote = renderNewVote;
exports.postNewVote = postNewVote;
exports.getVoteById = getVoteById;
exports.updateVoteById = updateVoteById;
exports.deleteVote = deleteVote;
