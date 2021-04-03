const createError = require('http-errors');
const User = require('../models/User');
const Voting = require('../models/Voting');

exports.getMain = async (req, res, next) => {
  try {
    const allVotingList = await Voting.find({}).sort({ dueDate: -1 });

    // const founderList = allVotingList.map(item => User.findById(item.founder));
    
    // await User.find({ myVotings: })
    res.render('main', { user: req.user, list: allVotingList });
  } catch (err) {
    next(createError(err.status));
  }
};
