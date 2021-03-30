const passport = require("passport");

const Vote = require("../models/Vote");

async function renderHome(req, res, next) {

  //TODO: to middleware
  if (req.user) {
    res.locals.user = req.user;
  }

  try {
    const allVotes = await Vote.find({});
    console.log(allVotes);
    res.status(200).render('index', { allVotes });
  } catch (error) {
    console.error(error);
  }
}

exports.renderHome = renderHome;
