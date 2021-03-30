const createError = require('http-errors');
const Voting = require('../models/Voting');

exports.getMain = async (req, res, next) => {
  console.log('main!!!');
  try {
    const allVotingList = await Voting.find({}).exec();
    console.log(allVotingList);
    res.render('main', { user: req.user, list: allVotingList });
  } catch (err) {
    next(createError(err.status));
  }
};
