const Voting = require('../models/voting');
const User = require('../models/user');
const VotingService = require('../services/votingService');
const routes = require('../constants/routes');
const isVotingExpired = require('../utils/isVotingExpired');
const processVotingDetailData = require('../utils/processVotingDetailData');
const processVotingData = require('../utils/processVotingData');
const processVotingLists = require('../utils/processVotingLists');
const { ERROR, TEMPLATE, RESPONSE } = require('../constants');

const votingServiceInstance = new VotingService(Voting, User);

module.exports = {
  getAllVotings: async (req, res, next) => {
    try {
      let initialVotingData = await votingServiceInstance.getAllVotingData();
      initialVotingData = processVotingData(initialVotingData);

      res.render(TEMPLATE.HOME, { initialVotingData });
    } catch (error) {
      next(error);
    }
  },

  getVotingDetail: async (req, res, next) => {
    const { id: votingId } = req.params;
    const userId = req.user && req.user._id;
    const username = req.user && req.user.username;

    try {
      const votingData = await votingServiceInstance.getVotingDetailData(
        votingId,
        userId,
        username
      );

      const votingDetailData = processVotingDetailData(
        votingData,
        userId,
        username
      );

      res.render(TEMPLATE.VOTING_DETAIL, {
        votingDetailData,
      });
    } catch (error) {
      next(error);
    }
  },

  updateVotingDetail: async (req, res, next) => {
    const { id: votingId } = req.params;
    const { _id: userId } = req.user;
    const { id: listId } = req.body;

    try {
      await votingServiceInstance.updateVotingDetail(votingId, userId, listId);
      res.json({ result: RESPONSE.SUCCESS });
    } catch (error) {
      res.status(500).json({ result: error });
    }
  },

  deleteVotingDetail: async (req, res, next) => {
    const { id: userId } = req.user;
    const { id: votingId } = req.params;

    try {
      await votingServiceInstance.deleteVotingData(votingId, userId);
      res.json({ result: RESPONSE.SUCCESS });
    } catch (error) {
      res.status(500).json({ result: error });
    }
  },

  getNewVoting: (req, res, next) => {
    res.render(TEMPLATE.NEW_VOTING);
  },

  createNewVoting: async (req, res, next) => {
    const { username, _id: userId } = req.user;
    const {
      vote_title: votingTitle,
      vote_list: votingLists,
      vote_expired_time: votingExpiredTime,
    } = req.body;

    if (isVotingExpired(new Date(votingExpiredTime))) {
      res.render(TEMPLATE.NEW_VOTING, {
        error: ERROR.INVAILD_DATE,
      });

      return;
    }

    const newVotingData = {
      title: votingTitle,
      creator: username,
      votingLists: processVotingLists(votingLists),
      expiredTime: votingExpiredTime,
    };

    try {
      await votingServiceInstance.createVotingData(newVotingData, userId);

      res.redirect(`${routes.votings}${routes.success}`);
    } catch (error) {
      res.redirect(`${routes.votings}${routes.failure}`);
    }
  },

  getSuccess: (req, res, next) => {
    res.render(TEMPLATE.SUCCESS);
  },

  getFailure: (req, res, next) => {
    res.render(TEMPLATE.FAILURE);
  },
};
