const indexService = require('../../services/index.service');

exports.getAllVotings = async (req, res, next) => {
  try {
    const allVotingsData = await indexService.getAllVotings();
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
