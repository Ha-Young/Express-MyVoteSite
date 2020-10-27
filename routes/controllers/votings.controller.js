const Voting = require('../../models/Voting');

exports.renderNew = (req, res, next) => {
  return res.render('new');
}

exports.createVoting = async (req, res, next) => {
  const { title, option } = req.body;
  const { _id } = req;
  const expireDay = req.body['expire-day'];

  const votingData = {
    title: title,
    expire_day: expireDay,
    option: option,
    userId: _id
  };

  try {
    await Voting.create(votingData);

    return res.redirect('/');
  } catch (err) {
    console.log(err);
    // next(err);
  }
};
