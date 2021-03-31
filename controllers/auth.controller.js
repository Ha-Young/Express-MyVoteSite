const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');

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

function getGithubAuthCallback(rea, res) {
  res.status(301).redirect('/home');
}

function getRegister(req, res, next) {
  res.render('signup');
}

async function postRegister(req, res, next) {
  try {
    // TODO: salt 상수화.
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    res.redirect('/');
  } catch (err) {
    res.redirect('/auth/login/register');
  }
}

const postLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
});

exports.renderLogin = renderLogin;
exports.logout = logout;
exports.getGithubAuth = getGithubAuth;
exports.getGithubAuthCallback = getGithubAuthCallback;
exports.getRegister = getRegister;
exports.postRegister = postRegister;
exports.postLogin = postLogin;
