const Voting = require('../models/voting');
const User = require('../models/user');
const VotingService = require('../services/votingService');
const { TEMPLATE } = require('../constants');
const processVotingData = require('../utils/processVotingData');

const votingServiceInstance = new VotingService(Voting, User);

module.exports = {
  getMyVotings: async (req, res, next) => {
    const { id: userId } = req.user;

    try {
      let myVotingData = await votingServiceInstance.getMyVotingData(userId);
      myVotingData = processVotingData(myVotingData);

      res.render(TEMPLATE.MY_VOTING, { myVotingData });
    } catch (error) {
      next(error);
    }
  },
};
