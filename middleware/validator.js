const User = require('../models/User');
const constants = require('../constants');

const validationResult = async (req, res, next) => {
  const { name, email, password, checkPassword} = req.body;
  const existUser = await User.findOne({ email });

  const isKorean = name => {
    const koreanPattern = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
    return name.replace(koreanPattern, '');
  };

  if (!isKorean(name)) {
    return res.render('signup', {
      nameError: constants.ERROR_MESSAGE_INPUT_NAME
    });
  }
  if (existUser) {
    return res.render('signup', {
      emailError: constants.ERROR_MESSAGE_EXIST_EMAIL
    });
  }
  if (!email.includes('@')) {
    return res.render('signup', {
      emailError: constants.ERROR_MESSAGE_INPUT_EMAIL
    });
  }
  if (password !== checkPassword) {
    return res.render('signup', {
      passwordError: constants.ERROR_MESSAGE_INPUT_PASSWORD
    });
  }
  console.log('validator')
  next();
};


exports.validationResult = validationResult;