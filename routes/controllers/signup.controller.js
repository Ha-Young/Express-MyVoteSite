const User = require('../../models/User');
const { loginErrorMessage, SALT_ROUNDS } = require('../../constants');
const { PASSWORD_NOT_MATCHED, EMAIL_NOT_AVAILABLE } = loginErrorMessage;
const bcrypt = require('bcrypt');
const saltRounds = SALT_ROUNDS;

exports.createNewUser = async (req, res, next) => {
  const { email, nickname, password, confirm_password: confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      req.flash('message', PASSWORD_NOT_MATCHED);
      return res.redirect('/signup');
    }

    const existedUser = await User.findOne({ email: email });
    if (existedUser) {
      req.flash('message', EMAIL_NOT_AVAILABLE)
      return res.redirect('signup');
    }

    const hash = await bcrypt.hash(password, saltRounds);
    await User.create({ email, nickname, password: hash, myVotings: [] });
    next();
  } catch (error) {
    next(error);
  }

  // 이메일 주소 검증
  // 2. 유효성 체크 - @이 들어갔는지 확인
};

exports.renderSignup = (req, res, next) => {
  const message = req.flash('message');
  res.render('signup', { message });
};

exports.redirectToLogin = (req, res, next) => {
  res.redirect('/login');
};
