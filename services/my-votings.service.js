const User = require('../models/User');
const { calculateDate, checkInProgress } = require('../utils');
const { dbErrorMessage } = require('../constants');
const {
  DB_ERROR_READING_MY_VOTINGS,
} = dbErrorMessage;

exports.getAllMyVotings = async userId => {
  try {
    const myVotingsData = await User.findById(userId).populate('myVotings').lean();
    myVotingsData.myVotings.map(data => {
      data.dueDate = calculateDate(data.dueDate);
      data.isInProgress = checkInProgress(data.dueDate);
    });
    return myVotingsData;
  } catch (error) {
    throw new Error(DB_ERROR_READING_MY_VOTINGS + error);
  }
};
