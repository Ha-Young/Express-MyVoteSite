const createError = require('http-errors');
const Voting = require('../models/Voting');
const User = require('../models/User');

exports.getMyPage = async (req, res, next) => {
  try {
    console.log(req.user.id);
    const userVotingList = await User.findById(req.user.id).exec();
    console.log(userVotingList);
    res.render('partial/myVotings', { user: req.user, list: userVotingList });
  } catch (err) {
    next(createError(err.status));
  }
};
