const { VotingService, } = require('../services/database');

const votingService = new VotingService();

const getMainPage = async (req, res, next) => {
  try {
    const votings = await votingService.getVotings();

    res.locals.votings = votings;
    res.render('index');
  } catch (err) {
    console.error('🔥 controller: home -> getMainPage', err);
    next(err);
  }
};

module.exports = {
  getMainPage,
};
