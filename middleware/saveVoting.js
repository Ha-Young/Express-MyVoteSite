const Voting = require('../model/Voting');

const saveVoting = async (req, res, next) => {
  const userId = req.session.user._id;
  const form = res.locals.serializedForm;

  try {
    await Voting.create({ ...form, creator: userId, });
  } catch (err) {
    return next(err);
  }

  next();
};

module.exports = saveVoting;
