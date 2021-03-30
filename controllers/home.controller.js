const Vote = require("../models/Vote");

async function renderHome(req, res) {

  //TODO: to middleware
  if (req.user) {
    res.locals.user = req.user;
  }

  try {
    await Vote.updateIsVotable(new Date());
    const allVotes = await Vote.find({});

    res.status(200).render('index', { allVotes });
  } catch (error) {
    console.error(error);
  }
}

exports.renderHome = renderHome;
