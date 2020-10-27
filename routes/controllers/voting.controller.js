const Voting = require('../../models/Voting');
const Option = require('../../models/Option');

exports.renderNewVotingMakerPage = (req, res, next) => {
  res.render('newVoting');
};

exports.renderMyVotingsPage = (req, res, next) => {
  res.render('myVotings');
};

exports.getVotingDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const voting = await Voting.findOne({ _id: id });
    const { options } = await Option.findOne({ _id: voting.options });

    res.render('votingDetails', { voting, options });
  } catch (err) {
    next(err);
  }
};
