const passport = require('passport');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const moment = require('moment');

const User = require('../models/User');
const Voting = require('../models/Voting');
moment.locale('ko');

const indexController = {
  getMain: async (req, res, next) => {
    try {
      const votingList = await Voting.find().populate('creator');

      // 찾지 못했을때 에러처리 필요

      for (let i = 0; i < votingList.length; i++) {
        const formatDate = moment(votingList[i].endDate).fromNow();
        votingList[i].formatDate = formatDate;
      }
      votingList.currentDate = new Date();

      res.render('index', { votingList });
    } catch (error) {
      // 에러처리 필요
      console.log('error');
    }
  },

  getMyVotings: async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).populate('votingList');
      // 못찾았을때 에러처리
      const votingList = user.votingList;

      for (let i = 0; i < votingList.length; i++) {
        const formatDate = moment(votingList[i].endDate).fromNow();
        votingList[i].formatDate = formatDate;
      }
      votingList.currentDate = new Date();

      res.render('myVotings', { votingList, userName: req.user.name });
    } catch (error) {
      console.log(error);
    }
  },

  getLogin: (req, res, next) => {
    res.render('login');
  },

  postLogin: passport.authenticate('local', { failureRedirect: '/login' }),

  postPrePageLogin: (req, res) => {
    const preUrl = req.session.preUrl || '/';
    req.session.preUrl ? delete req.session.preUrl : null;
    res.redirect(preUrl);
  },

  getLogout: (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
  },

  getSignup: (req, res, next) => res.render('signup'),

  postSignup: async (req, res, next) => {
    const {
      body: { email, password, password2, name }
    } = req;

    try {
      const overlapUserData = await User.findOne({ email });
      // 이미 중복된 아이디가 있을 경우를 체크
      if (overlapUserData) return next(createError(500, '중복된 이메일이 존재합니다.'));
      // 클라이언트 스크립트에 비밀번호 틀리면 로직 추가
      if (password !== password2) return next(createError(500, '비밀번호가 틀렸습니다.'));

      // 두 가지 모두 만족하면 hash 생성 후 저장한다.
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const user = new User({ name, email, hash });
      await user.save();

      res.redirect('/login');
    } catch (error) {
      next(error);
    }
  }
};
module.exports = indexController;
