const User = require('../../models/User');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../../constants');

exports.createNewUser = async (req, res, next) => {
  try {
    const { email, nickname, password } = req.body;
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    await User.create({ email, nickname, password: hash, myVotings: [] });
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
