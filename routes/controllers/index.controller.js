const Voting = require('../../models/Voting');
const { calculateDate, checkInProgress } = require('../utils');

exports.getAllVotings = async (req, res, next) => {
  try {
    const allVotingsData = await Voting.find().populate('writer').lean();

    allVotingsData.forEach(data => {
      data.due_date = calculateDate(data.due_date);
      data.isInProgress = checkInProgress(data.due_date);
    });

    req.votingsData = allVotingsData;
    next();
  } catch (error) {
    next(error);
  }
};

exports.renderIndex = (req, res, next) => {
  const votingsData = req.votingsData;
  res.render('index', { votingsData });
};
