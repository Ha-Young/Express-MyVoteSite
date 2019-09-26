const passport = require('passport');
const User = require('../../models/User');

exports.getSignupPage = (req, res, next) => {
  res.render('signup', { title: 'signup', message : ''});
};

exports.validateUserData = async (req, res, next) => {
  try {
    const hasUser = await User.exists({ email: req.body.email });

    if (hasUser) {
      req.flash('error', 'Email address already subscribed.');
      return res.render('signup', { title: 'signup', message: req.flash('error') });
    }

    if (req.body.password !== req.body.repeatedPassword) {
      req.flash('error', 'Please write the same two passwords.');
      return res.render('signup', { title: 'signup', message: req.flash('error') });
    }

    next();
  } catch (error) {
    next(error);
  }
};

exports.createUserData = async (req, res, next) => {
  try {
    const newUser = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    };

    if (req.body.profileImgUrl) {
      newUser.profile_img_url = req.body.profileImgUrl;
    }

    await new User(newUser).save();

    res.status(302).redirect('/');
  } catch (error) {
    next(error);
  }
};

exports.getLoginPage = (req, res, next) => {
  res.render('login', { title: 'login', message: req.flash('error') });
};

exports.loginFailure = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
});

exports.loginSuccess = (req, res, next) => {
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
