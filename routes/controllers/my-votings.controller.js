const Voting = require('../../models/Voting');

exports.showMyVotings = async (req, res, next) => {
  const { _id, username } = req.user;

  try {
    const myVotingList = await Voting.find({ userId: _id });

    return res.render('my-Votings', {
      username,
      myVotingList
    });
  } catch (err) {
    return next(err);
  }
};
