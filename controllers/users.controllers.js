const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

const renderRegisterPage = (req, res, next) =>
  res.status(200).render('register');

const renderLoginPage = (req, res, next) => res.status(200).render('login');

const handleLogout = (req, res, next) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.status(200).redirect('/users/login');
};

const handleLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
};

const registerUser = async (req, res, next) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.status(200).render('register', {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        errors.push({ msg: 'Email already exists' });
        return res.status(200).render('register', {
          errors,
          name,
          email,
          password,
          password2,
        });
      }
      const newUser = new User({
        name,
        email,
        password,
      });

      bcrypt.genSalt(10, (error, salt) => {
        if (error) throw error;
        bcrypt.hash(newUser.password, salt, async (error, hash) => {
          if (error) throw error;
          newUser.password = hash;
          await newUser.save();
          req.flash('success_msg', 'You are now registered and can log in');
          res.status(200).redirect('/users/login');
        });
      });
    } catch (error) {
      error.status(500);
      next(error);
    }
  }
};

module.exports = {
  registerUser,
  handleLogin,
  handleLogout,
  renderLoginPage,
  renderRegisterPage,
};
