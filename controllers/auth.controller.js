const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/User');
const { mongodbErrorMessage } = require('../constants/mongodbErrorMessage');
const { getErrorMessage } = require('../utils');

exports.signup = async function (req, res) {
  const { email, name, password } = req.body;

  try {
    const isEmailAlreadyUsed = await User.exists({ email });

    if (isEmailAlreadyUsed) {
      req.flash('userInput', req.body);
      req.flash('errors', getErrorMessage(new Error(mongodbErrorMessage.EMAIL_ALREADY_EXIST)));

      return res.status(301).redirect('/signup');
    } else {
      const hashedPassword = await argon2.hash(password);

      await User.create({
        email,
        name,
        password: hashedPassword,
      });

      res.status(301).redirect('/login');
    }
  } catch (err) {
    next(createError(500, err));
  }
};

exports.login = async function (req, res) {
  const { email, password } = req.body;

  try {
    const currentUser = await User.findOne({ email }).lean();

    if (!currentUser) {
      req.flash('userInput', req.body);
      req.flash('errors', getErrorMessage(new Error(mongodbErrorMessage.EMAIL_DOESNT_EXIST)));

      return res.status(301).redirect('/login');
    }

    const correctPassword = await argon2.verify(currentUser.password, password);

    if (!correctPassword) {
      req.flash('userInput', req.body);
      req.flash('errors', getErrorMessage(new Error(mongodbErrorMessage.WRONG_PASSWORD)));

      return res.status(301).redirect('/login');
    }

    res.cookie('access_token', jwt.sign(
      { id: currentUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '2H'}
    ));

    if (req.cookies.prev_page) {
      res.clearCookie('prev_page');
      return res.status(301).redirect(req.cookies.prev_page);
    }

    res.status(301).redirect('/');
  } catch (err) {
    next(createError(500, err));
  }
};
