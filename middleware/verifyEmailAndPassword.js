const User = require('../model/User');
const { CANT_FIND_EMAIL, DIFF_PASSWORD, } = require('../services/constants');

const verifyPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email, });

  if (!user) {
    return res.render('login', {
      message: CANT_FIND_EMAIL,
    });
  }

  if (user.password !== res.locals.password) {
    return res.render('login', {
      message: DIFF_PASSWORD,
    });
  }

  next();
};

module.exports = verifyPassword;
