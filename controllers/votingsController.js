const moment = require('moment');
const mongoose = require('mongoose');

const User = require('../models/User');
const Voting = require('../models/Voting');

const votingsController = {
  getNewVoting: (req, res, next) => res.render('newVoting'),

  postNewVoting: async (req, res, next) => {
    const {
      body: { title, item, endDate, endTime }
    } = req;

    try {
      const user = await User.findById(req.user.id);
      const time = new Date(`${endDate} ${endTime}`).toISOString();
      const voting = new Voting({
        title: title,
        creator: req.user.id,
        count: 0,
        endDate: time,
        item: item.map(vote => ({ item: vote, count: 0 }))
      });

      user.votingList.push(mongoose.Types.ObjectId(voting._id));

      await user.save();
      await voting.save();
      res.redirect('/');
    } catch (error) {}
  },

  getDetailVoting: async (req, res, next) => {
    const votingId = req.params.voting_id;
    const voting = await Voting.findById(votingId).populate('creator');
    voting.formatDate = moment(voting.endDate).format('LLLL');
    res.render('detailVoting', { voting });
  },

  postVotingComplete: async (req, res, next) => {
    const votingId = req.params.voting_id;
    const votingItemId = req.body.voting;
    const userId = req.user.id;

    try {
      const voting = await Voting.findById(votingId);
      const checkOverlapUser = () => voting.joinUser.filter(user => String(user) === userId).length;
      if (checkOverlapUser()) {
        // 유저가 중복일때
        // 따로 중복투표라는 렌더링 페이지 만드는게 좋을 것 같음
        res.redirect('/');
      } else {
        voting.item.filter(vote => String(vote._id) === votingItemId)[0].count++;
        voting.joinUser.push(mongoose.Types.ObjectId(userId));
        voting.count++;
        await voting.save();
        res.redirect('/');
      }
    } catch (error) {
      console.log(error);
    }
  },

  getVotingRemove: async (req, res, next) => {
    // 삭제로직 추가요망
    // 삭제하고 유저에있는 아이템도 삭제해야됨
    res.redirect('/');
  }
};
module.exports = votingsController;
