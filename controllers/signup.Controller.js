const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res, next) => {
  const { nickname, email } = req.body;
  let { password } = req.body;

  const saltRounds = process.env.SALT_ROUND;
  const salt = bcrypt.genSaltSync(Number(saltRounds));

  new User({
    nickname,
    email,
    password: bcrypt.hashSync(password, salt)
  }).save();

  next();
};
