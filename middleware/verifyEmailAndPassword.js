const bcrypt = require('bcrypt');

const User = require('../model/User');
const { CANT_FIND_EMAIL, DIFF_PASSWORD, } = require('../services/constants');

const verifyPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email, });
  const isSameUser = await bcrypt.compare(req.body.password, user.password);

  if (!user) {
    return res.render('login', {
      message: CANT_FIND_EMAIL,
    });
  }

  if (!isSameUser) {
    return res.render('login', {
      message: DIFF_PASSWORD,
    });
  }

  const { _id, nickname, email, } = user;
  res.locals.user = { _id, nickname, email, };

  next();
};

module.exports = verifyPassword;
