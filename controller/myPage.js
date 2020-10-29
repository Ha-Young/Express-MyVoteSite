const { VotingService, } = require('../services/database');

const votingService = new VotingService();

const getMyPage = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const votings = await votingService.getVotingsByUserId(userId);

    res.locals.votings = votings;
    res.render('myPage');
  } catch (err) {
    console.error('🔥 controller: myPage -> getMyPage', err);
    next(err);
  }
};

module.exports = {
  getMyPage,
};
