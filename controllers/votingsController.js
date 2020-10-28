const Voting = require('../models/voting');
const User = require('../models/user');
const routes = require('../constants/routes');

module.exports = {
  home: async (req, res, next) => {
    const initialVotingDatas = await Voting.find().lean();

    initialVotingDatas.forEach((initialVotingDate) => {
      const {
        expired_date: expiredDate,
        expired_time: expiredTime,
      } = initialVotingDate;

      const submittedExpiredTime = `${expiredDate} ${expiredTime}`;
      const isExipredTimePassed =
        new Date(`${submittedExpiredTime}`) <= new Date();

      if (isExipredTimePassed) {
        initialVotingDate.isVotingEnd = true;
      }
    });

    res.render('home', { initialVotingDatas });
  },

  getVotingDetail: async (req, res, next) => {
    const { id: votingId } = req.params;
    const userId = req.user && req.user._id;
    const username = req.user && req.user.username;
    let isParticipated;
    let votingData;

    try {
      votingData = await Voting.findById(votingId);
      isParticipated = votingData.participants.includes(userId.toString());
    } catch (error) {
      next(error);
    }

    const filteredVotingData = {
      title: votingData.title,
      creator: votingData.creator,
      votingId: votingData._id,
      votingLists: votingData.votingLists,
      expiredDate: votingData.expired_date,
      expiredTime: votingData.expired_time,
    };

    const { expiredDate, expiredTime } = filteredVotingData;

    const submittedExpiredTime = `${expiredDate} ${expiredTime}`;
    const isExipredTimePassed =
      new Date(`${submittedExpiredTime}`) <= new Date();

    if (isExipredTimePassed) filteredVotingData.isVotingEnd = true;

    const isUserCreator = username === votingData.creator;

    res.render('votingDetail', {
      ...filteredVotingData,
      isUserCreator,
      isParticipated,
    });
  },

  updateVotingDetail: async (req, res, next) => {
    const { id: listId } = req.body;
    const { id: votingId } = req.params;
    const { _id: userId } = req.user;
    let votingData;

    try {
      votingData = await Voting.findOneAndUpdate(
        { _id: votingId, 'votingLists._id': listId },
        {
          $addToSet: {
            participants: userId,
            'votingLists.$.voter': userId,
          },
        }
      );
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
      await Voting.findByIdAndDelete(votingId);
    } catch (error) {
      res.status(500).json({ result: error });
      return;
    }
    try {
      await User.findByIdAndUpdate(userId, { $pull: { votings: votingId } });
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
      vote_enddate: votingEndDate,
      vote_endtime: votingEndTime,
    } = req.body;

    const mappedVotingLists = votingLists
      .filter((votingList) => votingList !== '')
      .map((votingList) => {
        return { listTitle: votingList };
      });

    const newVotingData = {
      title: votingTitle,
      creator: username,
      votingLists: mappedVotingLists,
      expired_date: votingEndDate,
      expired_time: votingEndTime,
    };

    const submittedExpiredTime = `${votingEndDate} ${votingEndTime}`;
    const isExipredTimePassed =
      new Date(`${submittedExpiredTime}`) <= new Date();

    if (isExipredTimePassed) {
      res.render('newVoting', {
        error: '현재 시간보다 이후 시간으로 만료시간을 정해주세요',
      });
      return;
    }

    let newVoting;

    try {
      newVoting = await Voting.create(newVotingData);
    } catch (err) {
      res.redirect(`${routes.votings}${routes.failure}`);
      return;
    }

    try {
      await User.findByIdAndUpdate(userId, {
        $push: { votings: newVoting._id },
      });
    } catch (err) {
      next(err);
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
