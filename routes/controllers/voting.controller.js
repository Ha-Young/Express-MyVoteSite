const Voting = require('../../models/Voting');

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
    const isCreator = voting.createdBy === req.user._id;

    res.render('votingDetails', { voting, isCreator });
  } catch (err) {
    next(err);
  }
};
