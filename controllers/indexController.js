const _ = require('lodash');
const User = require('../models/User');
const Voting = require('../models/Voting');
const { dateFormat } = require('../libs/date');

exports.showIndex = async (req, res, next) => {
  try {
    const votingList = await Voting.find();
    const PROGRESS = ['진행중', '종료'];
    const today = new Date();
    const votings = await Voting.find().populate('creator');
    const expirationList = [];
    let user = req.user;

    if (req.user) user = await User.findOne({ _id: user.id });

    async function updateVoting(votingList) {
      let promises = votingList.map(voting => {
        if (today < new Date(voting.expiration)) voting.progress = PROGRESS[0];
        else voting.progress = PROGRESS[1];
        Voting(voting).save();
      });

      return Promise.all(promises);
    }

    updateVoting(votingList);

    votings.forEach(voting => {
      expirationList.push(dateFormat(voting.expiration));
    });

    res.render('index', { votings, expirationList, user });
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

exports.showLogin = (req, res, next) => {
  res.render('login', { referer: req.headers.referer });
};

exports.showSignup = (req, res, next) => {
  res.render('signup');
};

exports.checkVaildAccount = (req, res, next) => {
  const { email, nickname, password, 'password-check': passwordCheck } = req.body;
  const pattern = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

  if (!email) res.render('signup', { signupMessage: '이메일을 입력해주세요' });
  else if (!nickname) res.render('signup', { signupMessage: '닉네임을 입력해주세요' });
  else if (!password) res.render('signup', { signupMessage: '비밀번호를 입력해주세요' });
  else if (!passwordCheck) res.render('signup', { signupMessage: '비밀번호 확인을 입력해주세요' });
  else if (!pattern.test(password)) res.render('signup', { signupMessage: '비밀번호는 최소 8자리 이상 문자, 숫자, 특수문자를 포함해야 합니다' });
  else if (!_.isEqual(password, passwordCheck)) res.render('signup', { signupMessage: '비밀번호와 비밀번호 확인이 서로 다릅니다' });
  else next();
};
