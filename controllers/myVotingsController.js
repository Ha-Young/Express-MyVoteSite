const Voting = require('../models/voting');
const User = require('../models/user');
const VotingService = require('../services/votingService');

const votingServiceInstance = new VotingService(Voting, User);

module.exports = {
  getMyVotings: async (req, res, next) => {
    const { id: userId } = req.user;
    let myVotingData;

    try {
      myVotingData = await votingServiceInstance.getmyVotingData(userId);
    } catch (error) {
      next(error);
    }

    res.render('myVotings', { myVotingData });
  },
};
