const mongoose = require('mongoose');
const passport = require('passport');
const Vote = require('../models/Vote');
const User = require('../models/User');
const error = require('../libs/error');

exports.renderHome = async function (req, res, next) {
  try {
    console.log('i am in homeeee', req.isAuthenticated());

    const votes = await Vote.find();
    console.log('vote', votes);
    res.render('home', { votes });
  } catch (err) {
    console.log('error??에러발생???');
    next(new error.GeneralError(err.message));
  }
};

exports.renderLogin = async function (req, res, next) {
  try {
    console.log('로그인화면',req.isAuthenticated());
    res.render('login');
  } catch (err) {
    next(new error.GeneralError(err.message));
  } //나중에 트라이캐치 구문 지울것. 렌더확인요
};

exports.handleLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
});

exports.renderLogOut = async (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.status(302).redirect('/');
};

exports.renderJoin = async (req, res, next) => {
  try {
    res.render('join', { message: req.flash('duplication') });
  } catch (err) {
    next(new error.GeneralError(err.message));
  } //나중에 트라이캐치 구문 지울것. 렌더확인요
};

exports.handleJoin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if(user){
      req.flash('duplication', '이미 중복된 이메일이 있습니다.');
      return res.redirect('/join');
    } else {
      await User.create(req.body);
      req.flash('sucess', '가입이 성공하였습니다! 로그인해주세요');
      return res.redirect('/login');
    }
  } catch (err) {
    next(err);
  }
};
