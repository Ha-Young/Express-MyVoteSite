const Votes = require('../models/Votes');
const errors = require('../lib/errors');

exports.registerVote = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { title, expires_at, ...options } = req.body;

  const expirationTime = new Date(expires_at).toISOString();
  const currentTime = new Date().toISOString();

  if (expirationTime < currentTime) {
    return next(new errors.InvalidExpirationError());
  }

  const selectOptionList = Object.values(options).map(option => ({
    description: option,
    vote_counter: 0,
    voter: []
  }));

  try {
    await Votes.create({
      title,
      select_options: selectOptionList,
      created_by: userId,
      expires_at: expirationTime
    });

    res.redirect('/');
  } catch(err) {
    next(new errors.GeneralError(err.message));
  }
};
