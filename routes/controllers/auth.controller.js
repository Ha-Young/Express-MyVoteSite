const passport = require('passport');
const User = require('../../models/User');
const regExp = require('../../constants/reg-exp');
const {
  existedUser,
  invalidEmail,
  invalidPassword,
  confirmPassword
} = require('../../constants/err-messages');

exports.login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
});

exports.join = async function(req, res, next) {
  try {
    const { email, username, password, confirm_password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      return res.render('join', { message: existedUser, err: null });
    }

    if (!regExp.vaildEmail.test(email)) {
      return res.render('join', { message: invalidEmail, err: null });
    }

    if (!regExp.vaildPassword.test(password)) {
      return res.render('join', { message: invalidPassword, err: true });
    }

    if (password !== confirm_password) {
      return res.render('join', { message: confirmPassword, err: null });
    }

    const newUser = await new User({
      email: email,
      name: username,
      password: password
    });

    newUser.validate(async function(err) {
      if (err) {
        return next(err);
      }
      await newUser.save();
      res.redirect('/');
    });
  } catch(err) {
    next(err);
  }
};

exports.logout = function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
};
