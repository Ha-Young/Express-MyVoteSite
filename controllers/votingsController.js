const votingsController = {
  getNewVoting: (req, res, next) => {
    res.render('newVotings');
  }
};
module.exports = votingsController;
