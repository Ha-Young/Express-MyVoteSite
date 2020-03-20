const User = require('../models/User');
const Voting = require('../models/Voting');
const { dateFormat } = require('../libs/date');

exports.showCreateVoting = async (req, res, next) => {
  try {
    let user = req.user;
    if (user) user = await User.findOne({ _id: user.id });
    res.render('createVoting', { user });
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

exports.checkVaildInput = async (req, res, next) => {
  try {
    const { title, expiration, options } = req.body;
    const expirationText = `${expiration[0].replace(/-/gi, '/')} ${expiration[1]}:00`;
    const expirationDate = new Date(expirationText);
    const today = new Date();
    let user = req.user;
    if (user) user = await User.findOne({ _id: user.id });

    if (!title) res.render('createVoting', { createMessage: '투표 제목을 입력해주세요', user });
    else if (!expiration[0] || !expiration[1]) res.render('createVoting', { createMessage: '만료날짜를 지정해주세요', user });
    else if (today > expirationDate) res.render('createVoting', { createMessage: '지난 날짜는 선택할 수 없습니다', user });
    else if (!options[0] || !options[1]) res.render('createVoting', { createMessage: '최소 2개의 옵션을 입력해주세요', user });
    else next();
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

exports.createVoting = async (req, res, next) => {
  try {
    const { title, expiration } = req.body;
    const user = req.user;
    const expirationText = `${expiration[0].replace(/-/gi, '/')} ${expiration[1]}:00`;
    const expirationDate = new Date(expirationText);
    const today = new Date();
    const PROGRESS = ['진행중', '종료'];
    let { options } = req.body;
    let progress;
    
    options.forEach((option, index) => {
      if (!option) options.splice(index, 1);
    });

    today < expirationDate ? (progress = PROGRESS[0]) : (progress = PROGRESS[1]);

    for (let i = 0; i < options.length; i++) {
      options[i] = {
        title: options[i],
        vote: 0
      };
    }

    const voting = {
      title,
      creator: user._id,
      expiration: expirationDate.toISOString(),
      progress,
      options
    };

    const newVoting = await Voting.create(voting);
    const userData = await User.findOne({ _id: user._id });

    userData.created.push(newVoting._id);
    await User(userData).save();

    res.redirect('/');
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

exports.showVoting = async (req, res, next) => {
  try {
    const voting = await Voting.findOne({ _id: req.params.id }).populate('creator');
    const expiration = dateFormat(voting.expiration);
    let user = req.user;
    
    if (user) user = await User.findOne({ _id: user.id });

    res.render('voting', { voting, expiration, user });
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

exports.voting = async (req, res, next) => {
  try {
    const selected = req.body.option;
    const voting = await Voting.findOne({ _id: req.params.id });

    voting.options.forEach(option => {
      if (option.title === selected) option.vote++;
    });
    
    const updateVoting = await Voting(voting).save();
    let user = req.user;

    user = await User.findOne({ _id: user._id });

    user.voted.push(updateVoting._id);
    await User(user).save();

    res.redirect(`/votings/${req.params.id}`);
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

exports.deleteVoting = async (req, res, next) => {
  try {
    const userList = await User.find();

    const votingId = req.body.id;
    await Voting.deleteOne({ _id: votingId });

    userList.forEach(user => {
      user.created.forEach((createdVoting, index) => {
        if (createdVoting.toString() === votingId.toString()) {
          user.created.splice(index, 1);
        }
      });

      user.voted.forEach((voted, index) => {
        if (voted.toString() === votingId.toString()) {
          user.voted.splice(index, 1);
        }
      });

      User(user).save();
    });

    res.redirect('/');
  } catch (err) {
    err.status = 500;
    next(err);
  }
};
