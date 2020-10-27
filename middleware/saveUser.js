const User = require('../model/User');

const saveUser = async (req, res, next) => {
  let result;

  try {
    result = await User.create(req.body);
  } catch (err) {
    return next(err);
  }

  const { _id, email, nickname, } = result;
  res.locals.user = { _id, email, nickname, };

  next();
};

module.exports = saveUser;
