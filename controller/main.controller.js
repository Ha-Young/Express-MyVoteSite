const createError = require('http-errors');
const Voting = require('../models/Voting');

exports.getMain = async (req, res, next) => {
  try {
    const allVotingList = await Voting.find({})
      .populate('founder', 'username')
      .sort({ dueDate: -1 });

    res.render('main', { user: req.user, list: allVotingList });
  } catch (err) {
    next(createError(err.status));
  }
};
