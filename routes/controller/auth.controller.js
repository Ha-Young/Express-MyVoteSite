const passport = require('passport');
const User = require('../../models/User');
const { EMAIL_RULE } = require('../../models/constants/constants');

exports.getSignupPage = (req, res) => {
  res.render('signup', { title: 'signup', message : ''});
};

exports.validateUserData = async (req, res, next) => {
  try {
    const hasUser = await User.exists({ email: req.body.email });
    const newUser = Object.assign({}, req.body);

    for (let key in newUser) {
      newUser[key] = newUser[key].trim();
    }
    if (!newUser.profileImgUrl) {
      delete newUser.profileImgUrl;
    }

    if (hasUser) {
      req.flash('error', 'Email address already subscribed.');
      return res.render('signup', { title: 'signup', message: req.flash('error') });
    }

    if (req.body.password !== req.body.repeatedPassword) {
      req.flash('error', 'Please write the same two passwords.');
      return res.render('signup', { title: 'signup', message: req.flash('error') });
    }

    res.locals.newUser = newUser;

    next();
  } catch (error) {
    next(error);
  }
};

exports.createUserData = async (req, res, next) => {
  try {
    const user = new User(res.locals.newUser);
    await user.validate();
    await user.save();

    res.status(302).redirect('/login');
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.message = 'Your Informaion is Not Valid';
      error.status = 400;
      return next(error);
    }
    next(error);
  }
};

exports.checkEmailValidation = async (req, res, next) => {
  try {
    const hasUser = await User.exists({ email: req.body.email });
    const isMatched = EMAIL_RULE.test(req.body.email);

    res.send({ hasUser, isMatched });
  } catch (error) {
    next(error);
  }
};

exports.getLoginPage = (req, res) => {
  res.render('login', { title: 'login', message: req.flash('error') });
};

exports.loginFailure = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
});

exports.loginSuccess = (req, res) => {
  if (req.body.autoLogin) {
    req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000;
  } else {
    req.session.cookie.maxAge = 60 * 60 * 1000;
  }
  return res.redirect('/');
};

exports.logout = (req, res) => {
  req.logout();
  res.status(302).redirect('/login');
};
