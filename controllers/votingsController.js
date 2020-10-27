const Voting = require('../models/voting');
const routes = require('../constants/routes');

module.exports = {
  home: async (req, res, next) => {
    const initialVotingDates = await Voting.find();
    res.render('home', { initialVotingDates });
  },

  votingDetail: (req, res, next) => {
    res.render('newVoting');
  },

  newVoting: (req, res, next) => {
    res.render('newVoting');
  },

  createNewVoting: async (req, res, next) => {
    const { username } = req.user;
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

    if (new Date(`${votingEndDate} ${votingEndTime}`) <= new Date()) {
      res.render('newVoting', {
        error: '현재 시간보다 이후 시간으로 만료시간을 정해주세요',
      });
      return;
    }

    try {
      console.log(newVotingData);
      await Voting.create(newVotingData);
    } catch (err) {
      res.redirect(`${routes.votings}${routes.failure}`);
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
