const Voting = require('../models/Voting');
const { calculateDate, checkInProgress } = require('../utils');
const { dbErrorMessage: { DB_ERROR_READING_ALL_VOTINGS } } = require('../constants');

exports.getAllVotings = async () => {
  try {
    const allVotingsData = await Voting.find().populate('writer').lean();

    allVotingsData.forEach(data => {
      data.dueDate = calculateDate(data.dueDate);
      data.isInProgress = checkInProgress(data.dueDate);
    });

    return allVotingsData;
  } catch (error) {
    console.error(DB_ERROR_READING_ALL_VOTINGS);
    throw new Error(error);
  }
};
