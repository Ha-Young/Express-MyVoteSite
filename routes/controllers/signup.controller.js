const bcrypt = require('bcrypt');
const createError = require('http-errors');
const constants = require('../../constants');
const User = require('../../models/User');

exports.renderSignup = (req, res, next) => {
  res.render('signup');
};

exports.saveUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });

    const hash = await bcrypt.hash(password, 12);

    await User({ name, email, password: hash }).save();

    return res.redirect('/login');
  } catch (err) {
    next(err);
  }
};


    // //나중에 미들웨어로 처리하기
    // const distinguishKorean = (name) => {
    //   const koreanPattern = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
    //   return name.replace(koreanPattern, '');
    // };

    // if (!distinguishKorean(name)) {
    //   return res.render('signup', { nameError: constants.ERROR_MESSAGE_INPUT_NAME });
    // }
    // if (existUser) {
    //   return res.render('signup', { emailError: constants.ERROR_MESSAGE_EXIST_EMAIL });
    // }
    // if (!email.includes('@')) {
    //   return res.render('signup', { emailError: constants.ERROR_MESSAGE_INPUT_EMAIL });
    // }
    // if (password !== checkPassword) {
    //   return res.render('signup', { passwordError: constants.ERROR_MESSAGE_INPUT_PASSWORD });
    // }