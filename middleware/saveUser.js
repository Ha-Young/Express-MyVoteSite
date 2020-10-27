const bcrypt = require('bcrypt');

const { SALT_ROUND, } = require('../services/constants');
const User = require('../model/User');

const saveUser = async (req, res, next) => {
  let result;
  let bcryptPassword;

  try {
    bcryptPassword = await bcrypt.hash(req.body.password, SALT_ROUND);
  } catch (err) {
    return next(err);
  }

  try {
    result = await User.create({ ...req.body, password: bcryptPassword, });
  } catch (err) {
    return next(err);
  }

  const { _id, email, nickname, } = result;
  res.locals.user = { _id, email, nickname, };

  next();
};

module.exports = saveUser;
