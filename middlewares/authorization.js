const User = require('../models/User');

const isAuthenticated = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      res.locals.user = await User.findById(req.session.passport.user);
      next();
    } else {
      req.flash('alert', '로그인이 필요한 서비스입니다');
  
      if (req.params.id) {
        req.session.voteId = req.params.id;
      }
      
      res.locals.user = null;
      res.redirect('/login');
    }
  } catch (error) {
    next({
      status: 500,
      message: 'Internal Server Error'
    });
  }
};

const findLoggedInUser = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const user = await User.findById(req.session.passport.user);
      res.locals.user = user;
      next();
    } else {
      res.locals.user = null;
      next();
    }
  } catch (error) {
    next({
      status: 500,
      message: 'Internal Server Error'
    });
  }
};

const validateEmail = async (req, res, next) => {
  try {
    const emailRegularExp = /\S+@\S+\.\S+/;

    if (!emailRegularExp.test(req.body.email)) {
      req.flash('alert', '이메일 형식이 아닙니다');
      return res.redirect('/signup');
    }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      req.flash('alert', '이미 가입된 이메일 주소입니다 다른 이메일을 입력하여 주세요');
      return res.redirect('/signup');
    }

    next();
  } catch (error) {
    next({
      status: 500,
      message: 'Internal Server Error'
    });
  }
};

const validatePassword = (req, res, next) => {
  const regularExps = [/[0-9]/, /[a-z]/, /[~`!@#$%^&*()-_=+{},./?<>\|]/];
  const totalRegularExp = /[0-9a-z~`!@#$%^&*()-_=+{},./?<>\|]/;
  const password = req.body.password;
  let countType = 0;

  if (password.length < 6) {
    req.flash('alert', '비밀번호는 6자 이상이어야 합니다');
    return res.redirect('/signup');
  }

  if (password.length > 15) {
    req.flash('alert', '비밀번호는 15자 이내여야 합니다');
    return res.redirect('/signup');
  }

  if (!totalRegularExp.test(password)) {
    req.flash('alert', '비밀번호에 사용할 수 없는 문자가 포함되어있습니다');
    return res.redirect('/signup');
  }

  regularExps.forEach(exp => {
    if (exp.test(password)) {
      countType++;
    }
  });

  if (countType < 2) {
    req.flash('alert', '비밀번호는 영문 숫자 특수문자 중 2가지 이상이 필요합니다');
    return res.redirect('/signup');
  }

  if (password !== req.body.passwordCheck) {
    req.flash('alert', '비밀번호가 일치하지 않습니다');
    return res.redirect('/signup');
  }

  return next();
};

module.exports = {
  isAuthenticated,
  findLoggedInUser,
  validateEmail,
  validatePassword,
};
