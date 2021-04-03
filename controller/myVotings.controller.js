const createError = require('http-errors');
const Voting = require('../models/Voting');
const User = require('../models/User');

exports.getMyPage = async (req, res, next) => {
  try {
    const userInfo = await User.findById(req.user.id).exec();

    if (!userInfo) {
      return res.render('partial/message', {
        isSuccess: false,
        message: '데이터를 불러오는데에 실패했습니다',
      });
    }

    const userVotingList = await Voting.find({ _id: userInfo.myVotings })
      .sort({ dueDate: -1 });
    return res.render('partial/myVotings', {
      user: req.user,
      list: userVotingList,
    });
  } catch (err) {
    return next(createError(500));
  }
};
