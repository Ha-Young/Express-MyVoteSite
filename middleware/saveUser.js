const User = require('../model/User');
const { EMAIL_DUPLICATE_ERROR_MESSAGE, } = require('../services/constants');

const saveUser = async (req, res, next) => {
  const recivedEmail = req.body.email;
  const isDuplicatedEmail = await User.findOne({ email: recivedEmail, });

  if (isDuplicatedEmail) {
    return res.render('signup', {
      message: EMAIL_DUPLICATE_ERROR_MESSAGE,
    });
  }

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
