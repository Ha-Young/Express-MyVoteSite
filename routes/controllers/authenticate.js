const passport = require('passport');
const User = require('../../models/User');
const Vote = require('../../models/Vote');
const objectId = require('mongoose').Types.ObjectId;

exports.getProblemList = async (req, res, next) => {
  try {
    if (!objectId.isValid(req.user._id)) {
      return next();
    }

    const allVotes = await Vote.find({});

    for (let i = 0; i < allVotes.length; i++) {
      if (allVotes[i].date < new Date()) {
        allVotes[i].proceeding = false;
      }
    }

    res.render('index', {
      name: req.user.name || req.user.username,
      allVotes: allVotes
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return next();
    } else {
      return next(error);
    }
  }
};

exports.login = (req, res) => {
  var flashMessage = req.flash();
  var feedback = '';
  if (flashMessage.error) {
    feedback = flashMessage.error[0];
  }
  res.render('login', { error: feedback });
};

exports.signup = (req, res) => {
  var flashMessage = req.flash();
  var feedback = '';
  if (flashMessage.error) {
    feedback = flashMessage.error[0];
  }
  res.render('signUp', { error: feedback });
};

exports.loginLocal = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true,
  successFlash: true
});

exports.loginGithub = passport.authenticate('github');
exports.githubCallback = passport.authenticate('github', {
  failureRedirect: '/login',
  sucessRedirect: '/'
});

exports.logout = (req, res) => {
  req.logOut();
  res.status(301).redirect('/login');
};
