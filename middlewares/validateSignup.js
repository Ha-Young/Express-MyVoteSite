const bcrypt = require('bcrypt');
const User = require('../models/user');
const UserService = require('../services/userService');

const userServiceInstance = new UserService(User);

exports.validateSignUp = async (req, res, next) => {
  const {
    username,
    email,
    password,
    'password-confirm': passwordConfirm,
  } = req.body;
  const userData = { username, email, password, passwordConfirm };

  if (password !== passwordConfirm) {
    res.render('signup', {
      ...userData,
      error: '비밀번호를 일치시켜주세요.',
    });
    return;
  }

  try {
    const userData = await userServiceInstance.getUserbyName(username);

    if (userData) {
      res.render('signup', {
        userData,
        error: '동일한 닉네임이 존재합니다.',
      });

      return;
    }
  } catch (err) {
    next(err);
    return;
  }

  try {
    const userData = await userServiceInstance.getUserbyEmail(email);
    console.log(userData);
    if (userData) {
      res.render('signup', {
        userData,
        error: '동일한 이메일이 존재합니다.',
      });

      return;
    }
  } catch (err) {
    next(err);
    return;
  }

  try {
    const hasedPassword = await bcrypt.hash(password, 10);
    userData.password = hasedPassword;
  } catch (err) {
    next(err);
    return;
  }

  res.locals.userData = userData;
  next();
};
