const Voting = require('../model/Voting');
const { validateDate, } = require('../services/validate');

const getVotingsUser = async (req, res, next) => {
  const userId = req.session.user._id;
  const votings = await Voting.find({ creator: userId, });

  votings.forEach((voting) => {
    voting.openState = validateDate(voting.expiration_date);
  });

  res.locals.votings = votings;

  next();
};

module.exports = getVotingsUser;
