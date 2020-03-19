const { validationResult } = require('express-validator');
const createError = require('http-errors');
const User = require('../models/User');

exports.getLogin = (req, res, next) => {
  const flash = req.flash();
  if (flash.error && flash.error[0] === 'Missing credentials') {
    return res.render('login', { loginMsg: 'There is not exist email or password.', referer: req.headers.referer });
  }
  if (flash.error) return res.render('login', { loginMsg: flash.error[0] });
  if (flash.signUpMsg) return res.render('login', { loginMsg: flash.signUpMsg[0] });
  res.render('login', { loginMsg: 'Sign In', referer: req.headers.referer });
}

exports.getLogout = (req, res) => {
  req.session.destroy((err) => {
    req.logout();
    res.status(302).redirect('/');
  });
}

exports.getNewUser = (req, res, next) => {
  res.render('signup');
}

exports.makeNewUser = async (req, res, next) => {
  try {
    const errors = validationResult(req).errors;
    if(!errors.length) {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
      });

      await newUser.save();
      req.flash('signUpMsg', 'Welcome. :) Login Please.');
      res.status(307).redirect('/users/login');
    } else {
      return res.render('validationFail', { message: errors[0].msg });
    }
  } catch (err) {
    if (err.errmsg.split(' ')[1] === 'duplicate') {
      return res.render('validationFail', { message: 'This is a registered email.'});
    } else {
      next(createError(404, 'An unknown error occurred while signing up. Try again!'));
    }
  }
}

