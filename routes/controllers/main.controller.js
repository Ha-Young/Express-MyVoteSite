const Vote = require('../../models/Vote');
const { calculateDate, checkInProgress } = require('../utils');

exports.getAllVotes = async (req, res, next) => {
  try {
    const allVotesData = await Vote.find().populate('writer').lean();

    allVotesData.forEach(data => {
      const modifiedDate = calculateDate(data.due_date);
      data.due_date = modifiedDate;
      data.isInProgress = checkInProgress(data.due_date);
    });

    req.votesData = allVotesData;
    next();
  } catch (error) {
    next(error);
  }
};
