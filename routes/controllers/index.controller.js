const Voting = require('../../models/Voting');
const { calculateDate, checkInProgress } = require('../../utils');

exports.getAllVotings = async (req, res, next) => {
  try {
    const allVotingsData = await Voting.find().populate('writer').lean();

    allVotingsData.forEach(data => {
      data.dueDate = calculateDate(data.dueDate);
      data.isInProgress = checkInProgress(data.dueDate);
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
