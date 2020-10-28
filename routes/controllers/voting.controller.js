const Voting = require('../../models/Voting');
const User = require('../../models/User');
const { isExpiration } = require('../../utils');

exports.renderNewVotingMakerPage = (req, res, next) => {
  res.render('newVoting');
};

exports.renderMyVotingsPage = async (req, res, next) => {
  try {
    const { user: { _id } } = req;
    const { votings } = await User.findOne({ _id }).populate('votings');
    res.render('myVotings', { votings });
  } catch (err) {
    next(err);
  }
};

exports.getVotingDetails = async (req, res, next) => {
  let userId;

  try {
    if (req.user) {
      userId = req.user._id;
    } else {
      userId = null;
    }
  } catch (err) {
    console.error(err.message);
  }

  try {
    const { id } = req.params;
    const voting = await Voting.findOne({ _id: id });
    const { options } = voting.populate('options')

    console.log('details', options[0].voters.length);

    const isCreator = voting.createdBy.toString() === userId.toString();
    voting.isExpiration = isExpiration(voting.expirationDate);

    res.render('votingDetails', { id, voting, isCreator, options });
  } catch (err) {
    next(err);
  }
};

exports.vote = async (req, res, next) => {
  const { _id } = req.user;
  const { option } = req.body;

  try {
    await Voting.updateOne(
      { 'options._id': option },
      { $addToSet: { 'options.$[option].voters': _id } },
      { arrayFilters: [{ 'option._id': option }] }
    );
    res.json('success');
  } catch (err) {
    console.err(err);
  }
};

exports.success = async (req, res, next) => {
  res.render('success');
}

exports.deleteVoting = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw Error('id is not defined');
    await Voting.findByIdAndDelete(id);
    res.redirect('/');

  } catch (err) {
    next(err)
  }
};
