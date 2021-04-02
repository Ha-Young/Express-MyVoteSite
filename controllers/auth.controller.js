const passport = require('passport');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const getRandomSalt = require('../util/getRandomSalt');

function renderLogin(req, res) {
  res.status(200).render('login');
}

function logout(req, res) {
  req.logOut();
  req.session.destroy();
  res.status(301).redirect('/');
}

function getGithubAuth(req, res) {
  passport.authenticate('github', { scope: [ 'user:email' ] });
}

function getGithubAuthCallback(req, res) {
  const referrer = req.session.referrer ?? '/';
  delete req.session.referrer;

  res.status(301).redirect(referrer);
}

function getSignup(req, res, next) {
  res.status(200).render('signup');
}

async function postSignup(req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, getRandomSalt());

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    res.redirect('/');
  } catch (err) {
    req.flash('info', 'Failed to signup, try again :)');
    res.redirect('/auth/signup');
  }
}

function postLogin(req, res, next) {
  const referrer = req.session.referrer ?? '/';
  delete req.session.referrer;

  return passport.authenticate('local', {
    successRedirect: referrer,
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res);
}

exports.renderLogin = renderLogin;
exports.logout = logout;
exports.getGithubAuth = getGithubAuth;
exports.getGithubAuthCallback = getGithubAuthCallback;
exports.getSignup = getSignup;
exports.postSignup = postSignup;
exports.postLogin = postLogin;
