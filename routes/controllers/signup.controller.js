const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../../constants');
const UserService = require('../../services/signup.service');

exports.createNewUser = async (req, res, next) => {
  try {
    const { email, nickname, password } = req.body;
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const userInfo = {
      email,
      nickname,
      password: hash,
      myVotings: [],
    };

    await UserService.createNewUser(userInfo);
    next();
  } catch (error) {
    next(error);
  }
};

exports.renderSignup = (req, res, next) => {
  const message = req.flash('message');
  res.render('signup', { message });
};

exports.redirectToLogin = (req, res, next) => {
  res.redirect('/login');
};
