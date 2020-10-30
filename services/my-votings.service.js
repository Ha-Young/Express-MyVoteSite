const User = require('../models/User');
const { calculateDate, checkInProgress } = require('../utils');
const { dbErrorMessage: { DB_ERROR_READING_MY_VOTINGS } } = require('../constants');

exports.getAllMyVotings = async userId => {
  try {
    const myVotingsData = await User.findById(userId).populate('myVotings').lean();
    myVotingsData.myVotings.map(data => {
      data.dueDate = calculateDate(data.dueDate);
      data.isInProgress = checkInProgress(data.dueDate);
    });
    return myVotingsData;
  } catch (error) {
    console.error(DB_ERROR_READING_MY_VOTINGS);
    throw new Error(error);
  }
};
