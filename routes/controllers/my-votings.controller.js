const myVotingsService = require('../../services/my-votings.service');

exports.getAllMyVotings = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const myVotingsData = await myVotingsService.getAllMyVotings(userId);
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
