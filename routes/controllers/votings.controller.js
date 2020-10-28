const Voting = require('../../models/Voting');

exports.renderNew = (req, res, next) => {
  return res.render('new');
};

exports.createVoting = async (req, res, next) => {
  const { title, option } = req.body;
  const { _id, username } = req.user;
  const expireDay = req.body['expire-day'];

  const votingData = {
    title: title,
    expire_day: expireDay,
    option: option,
    creator: username,
    userId: _id
  };

  try {
    await Voting.create(votingData);

    return res.redirect('/');
  } catch (err) {
    return next(err);
  }
};

exports.getVotingDetail = async (req, res, next) => {
  try {
    const { voting_id } = req.params;
    const voting = await Voting.findById(voting_id);

    return res.render('votingdetail', {
      voting
    });
  } catch (err) {
    next(err);
  }
};
