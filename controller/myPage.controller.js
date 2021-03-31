const createError = require('http-errors');
const Voting = require('../models/Voting');
const User = require('../models/User');

exports.getMyPage = async (req, res, next) => {
  try {
    const userInfo = await User.findById(req.user.id).exec();

    if (!userInfo) {
      return res.render('partial/message', {
        message: '데이터를 불러오는데에 실패했습니다',
      });
    }

    const userVotingList = await Voting.find({ _id: userInfo.myVotings });
    if (userVotingList.length) {
      console.log(userVotingList);
    } else {
      console.log('empty');
    }

    return res.render('partial/myVotings', { user: req.user, list: userVotingList });
  } catch (err) {
    return next(createError(err.status));
  }
};
