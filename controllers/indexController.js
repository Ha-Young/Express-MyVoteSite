const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const createError = require('http-errors');

const indexController = {
  getMain: (req, res, next) => {
    res.render('index');
  },

  getMyVotings: (req, res, next) => {
    res.render('myVotings');
  },

  getLogin: (req, res, next) => {
    res.render('login');
  },

  postLogin: passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }),

  getLogout: (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
  },

  getSignup: (req, res, next) => {
    res.render('signup');
  },

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
      const user = new User({ name, email, salt, hash });
      await user.save();

      res.redirect('/login');
    } catch (error) {
      next(error);
    }
  }
};
module.exports = indexController;
