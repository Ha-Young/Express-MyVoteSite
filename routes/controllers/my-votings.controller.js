const User = require('../../models/User');
const { calculateDate, checkInProgress } = require('../utils');

exports.getAllMyVotings = async (req, res, next) => {
  try {
    const currentUserId = req.user._id;
    const myVotingsData = await User.findById(currentUserId).populate('myVotings').lean();

    myVotingsData.myVotings.map(data => {
      data.due_date = calculateDate(data.due_date);
      data.isInProgress = checkInProgress(data.due_date);
    });

    req.myVotingsData = myVotingsData.myVotings;
    next();
  } catch (error) {
    next(error);
  }
};

exports.renderMyVotings = (req, res, next) => {
  const myVotings = req.myVotingsData;
  res.render('my-votings', { myVotings });
};
