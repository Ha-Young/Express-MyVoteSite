const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UserService = require('../services/userService');
const { ERROR, TEMPLATE, BCRYPT } = require('../constants');

const userServiceInstance = new UserService(User);

exports.validateSignup = async (req, res, next) => {
  const {
    username,
    email,
    password,
    'password-confirm': passwordConfirm,
  } = req.body;
  const userData = { username, email, password, passwordConfirm };

  if (password !== passwordConfirm) {
    res.render(TEMPLATE.SIGNUP, {
      ...userData,
      error: ERROR.INVALID_PASSWORD,
    });
    return;
  }

  try {
    const userData = await userServiceInstance.getUserbyName(username);

    if (userData) {
      res.render(TEMPLATE.SIGNUP, {
        userData,
        error: ERROR.INVALID_USERNAME,
      });

      return;
    }
  } catch (err) {
    next(err);
    return;
  }

  try {
    const userData = await userServiceInstance.getUserbyEmail(email);

    if (userData) {
      res.render(TEMPLATE.SIGNUP, {
        userData,
        error: ERROR.INVAILD_EMAIL,
      });

      return;
    }
  } catch (err) {
    next(err);
    return;
  }

  try {
    const hasedPassword = await bcrypt.hash(password, BCRYPT.SALTVALUE);
    userData.password = hasedPassword;
  } catch (err) {
    next(err);
    return;
  }

  res.locals.userData = userData;
  next();
};
