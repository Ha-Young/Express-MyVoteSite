const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Vote = require('../models/vote');

const SALT = 6;

exports.loginLocal = (req, res, next) => {
  let successUrl = '/';

  if (req.session.voteId) {
    successUrl = '/votings/' + req.session.voteId;
    req.session.voteId = null;
  }

  return (passport.authenticate('local', {
    successRedirect: successUrl,
    failureRedirect: '/login',
    failureFlash: true,
  }))(req, res);
};

exports.loginGithub = passport.authenticate('github', {
  scope: ['user:email']
});

exports.loginGithubCallback = passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
});

exports.logout = (req, res, next)=> {
  if (req.session) {
    try {
      req.logOut();
      req.session.destroy();
      res.status(200).redirect('/');
    } catch (e) {
      next(e);
    }
  } else {
    try {
      res.status(200).redirect('/');
    } catch (e) {
      next(e);
    }
  }
};

exports.signup = async (req, res, next) => {
  const email = await User.findOne({ localEmail: req.body.email });

  if (email) {
    req.flash("usedEmail", "등록된 이메일입니다.");
    res.status(200).redirect('/signup');

    return;
  }

  const hash = await bcrypt.hash(req.body.password, SALT);

  await User.create({
    localEmail: req.body.email,
    password: hash,
    nickname: req.body.name,
  });

  res.status(200).redirect('/login');
};

exports.signout = async (req, res, next) => {
  const { _id } = req.user;
  const { ObjectId } = mongoose.Types;

  try {
    const votes = await Vote.aggregate([
      {
        $match: { "creater._id": ObjectId(_id) }
      }
    ]);

    for (let i = 0; i < votes.length; i++) {
      await Vote.deleteOne({ _id: votes[i]._id });
    }

    await User.deleteOne({ _id });
    req.session.destroy();

    res.redirect('/');
  } catch (e) {
    next(e);
  }
};
