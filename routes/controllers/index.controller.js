const Voting = require('../../models/Voting');
const { calculateDate, checkInProgress } = require('../utils');

exports.getAllVotes = async (req, res, next) => {
  try {
    const allVotesData = await Voting.find().populate('writer').lean();

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

exports.renderIndex = (req, res, next) => {
  const votesData = req.votesData;
  res.render('index', { votesData });
};
