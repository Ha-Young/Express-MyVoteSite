const Voting = require('../model/Voting');
const { validateDate, } = require('../services/validate');

const getVotings = async (req, res, next) => {
  let votings;

  try {
    votings = await Voting.find().populate('creator', { _id: 0, nickname: 1, });
  } catch (err) {
    return next(err);
  }

  votings.forEach((voting) => {
    voting.openState = validateDate(voting.expiration_date) ? 'Open' : 'Closed';
  });

  res.locals.votings = votings;
  next();
};

module.exports = getVotings;
