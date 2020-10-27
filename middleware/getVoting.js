const Voting = require('../model/Voting');
const { validateDate, } = require('../services/validate');

const getVoting = async (req, res, next) => {
  const votingId = req.params.voting_id;
  let voting;

  try {
    voting = await Voting.findById(votingId).populate('creator', { _id: 0, nickname: 1, });
  } catch (err) {
    return res.redirect('/');
  }

  voting.openState = validateDate(voting.expiration_date) ? 'Open' : 'Closed';

  res.locals.voting = voting;
  next();
};

module.exports = getVoting;
