const createError = require('http-errors');
const Voting = require('../../models/Voting');

exports.home = async (req, res, next) => {
  try {
    const allVotings = await Voting.find();

    res.render('index', {
      allVotings,
      currentDate: new Date().getTime(),
      user: req.user
    });
  } catch (err) {
    next(createError({
      message: '투표 목록을 불러올 수 없습니다'
    }));
  }
}

exports.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
};

exports.myVotings = async (req, res) => {
  const userId = req.user._id;

  try {
    const myVotingList = await Voting.find({ authorId: userId });
    const currentDate = new Date().getTime();

    res.render('myVotings', {
      myVotingList, currentDate,
      user: req.user
    });
  } catch (error) {
    next(createError({
      message: '내가 등록한 투표를 찾을 수 없습니다.'
    }));
  }
}
