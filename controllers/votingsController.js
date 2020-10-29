const Voting = require('../models/voting');
const User = require('../models/user');
const VotingService = require('../services/votingService');
const routes = require('../constants/routes');

const votingServiceInstance = new VotingService(Voting, User);

module.exports = {
  home: async (req, res, next) => {
    let initialVotingData;

    try {
      initialVotingData = await votingServiceInstance.getAllVotingData();
    } catch (error) {
      next(error);
      return;
    }

    res.render('home', { initialVotingData });
  },

  getVotingDetail: async (req, res, next) => {
    const { id: votingId } = req.params;
    const userId = req.user && req.user._id;
    const username = req.user && req.user.username;
    let votingDetailData;

    try {
      votingDetailData = await votingServiceInstance.getVotingDetailData(
        votingId,
        userId,
        username
      );
    } catch (error) {
      next(error);
      return;
    }

    res.render('votingDetail', {
      votingDetailData
    });
  },

  updateVotingDetail: async (req, res, next) => {
    const { id: votingId } = req.params;
    const { _id: userId } = req.user;
    const { id: listId } = req.body;

    try {
      await votingServiceInstance.updateVotingDetail(votingId, userId, listId)
    } catch (error) {
      res.status(500).json({ result: error });
      return;
    }

    res.json({ result: 'ok' });
  },

  deleteVotingDetail: async (req, res, next) => {
    const { id: userId } = req.user;
    const { id: votingId } = req.params;

    try {
      await votingServiceInstance.deleteVotingData(votingId, userId)
    } catch (error) {
      res.status(500).json({ result: error });
      return;
    }

    res.json({ result: 'ok' });
  },

  newVoting: (req, res, next) => {
    res.render('newVoting');
  },

  createNewVoting: async (req, res, next) => {
    const { username, _id: userId } = req.user;
    const {
      vote_title: votingTitle,
      vote_list: votingLists,
      vote_expired_time: votingExpiredTime,
    } = req.body;

    const mappedVotingLists = votingLists
      .filter((votingList) => votingList !== '')
      .map((votingList) => {
        return { listTitle: votingList };
      });

      console.log(votingExpiredTime);
    const submittedExpiredTime = `${votingExpiredTime}`;
    const isExipredTimePassed =
      new Date(`${submittedExpiredTime}`) <= new Date();

    if (isExipredTimePassed) {
      res.render('newVoting', {
        error: '현재 시간보다 이후 시간으로 만료시간을 정해주세요',
      });
      return;
    }

    const newVotingData = {
      title: votingTitle,
      creator: username,
      votingLists: mappedVotingLists,
      expiredTime: votingExpiredTime,
    };

    let newVoting;

    try {
      newVoting = await Voting.create(newVotingData);
    } catch (err) {
      res.redirect(`${routes.votings}${routes.failure}`);
      next(err);
      return;
    }

    try {
      await User.findByIdAndUpdate(userId, {
        $push: { votings: newVoting._id },
      });
    } catch (err) {
      next(err);
      return;
    }

    res.redirect(`${routes.votings}${routes.success}`);
  },

  getSuccess: (req, res, next) => {
    res.render('success');
  },

  getFailure: (req, res, next) => {
    res.render('failure');
  },
};
