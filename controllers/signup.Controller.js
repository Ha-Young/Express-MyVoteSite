const User = require('../models/User');
const bcrypt = require('bcrypt');
const errors = require('../helpers/error');

exports.register = async (req, res, next) => {
  const { nickname, email } = req.body;
  const { password } = req.body;

  try {
    const saltRounds = process.env.SALT_ROUND;
    const salt = bcrypt.genSaltSync(Number(saltRounds));

    await new User({
      nickname,
      email,
      password: bcrypt.hashSync(password, salt)
    }).save();

    next();
  } catch (error) {
    next(new errors.GeneralError(error));
  }
};
