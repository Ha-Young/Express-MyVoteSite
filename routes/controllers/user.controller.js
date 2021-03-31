const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

const SALT = 6;

exports.loginLocal = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
});

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
      res.redirect('/');
    } catch (e) {
      next(e);
    }
  } else {
    res.redirect('/');
  }
};

exports.signup = async (req, res, next) => {
  const email = await User.findOne({ localEmail: req.body.email });

  if (email) {
    req.flash("usedEmail", "등록된 이메일입니다.");
    res.redirect('/login');

    return;
  }

  try {
    const hash = await bcrypt.hash(req.body.password, SALT);

    await User.create({
      localEmail: req.body.email,
      password: hash,
      nickname: req.body.name,
    });

    res.redirect('/');
  } catch (e) {
    next(e);
  }
};

exports.signout = async (req, res, next) => {
};
