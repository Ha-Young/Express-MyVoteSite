const mongoose = require('mongoose');
const passport = require('passport');
const Vote = require('../models/Vote');
const User = require('../models/User');
const error = require('../libs/error');

exports.renderHome = async (req, res, next) => {
  try {
    const votes = await Vote.find();

    res.render('home', { votes });
  } catch (err) {
    next(new error.GeneralError(err.message));
  }
};

exports.renderLogin = async (req, res, next) => {
  res.render('login');
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
  res.render('join', { message: req.flash('duplication') });
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
