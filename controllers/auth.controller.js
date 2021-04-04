const passport = require('passport');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const getRandomSalt = require('../util/getRandomSalt');

function renderLogin(req, res) {
  res.status(200).render('login');
}

function getGithubAuth(req, res) {
  passport.authenticate('github', { scope: ['user:email'] });
}

function getGithubAuthCallback(req, res) {
  const referrer = req.session.referrer ?? '/';

  if (req.session.referrer) {
    delete req.session.referrer;
  }

  res.status(301).redirect(referrer);
}

function renderSignup(req, res, next) {
  res.status(200).render('signup');
}

async function postSignup(req, res, next) {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, getRandomSalt());

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(301).redirect('/');
  } catch (err) {
    req.flash('info', 'Failed to signup, try again :)');
    res.status(301).redirect('/auth/signup');
  }
}

function postLogin(req, res, next) {
  const referrer = req.session.referrer ?? '/';
  delete req.session.referrer;

  return passport.authenticate('local', {
    successRedirect: referrer,
    failureRedirect: '/auth/login',
    failureFlash: true,
  })(req, res);
}

function logout(req, res) {
  req.logOut();
  req.session.destroy();
  res.status(301).redirect('/');
}

exports.renderLogin = renderLogin;
exports.postLogin = postLogin;

exports.renderSignup = renderSignup;
exports.postSignup = postSignup;

exports.getGithubAuth = getGithubAuth;
exports.getGithubAuthCallback = getGithubAuthCallback;

exports.logout = logout;
