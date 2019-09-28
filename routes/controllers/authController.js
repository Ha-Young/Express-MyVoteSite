const passport = require('passport');
const bcrypt = require('bcrypt');

const User = require('../../models/User');

exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return next();

  res.status(301).redirect('/login');
};

exports.loginForm = (req, res) => {
  res.render('login', { flashes: null });
};

exports.validateLogin = (req, res, next) => {
  req.checkBody('email', '이메일 형식으로 입력해주세요.').isEmail();
  req.checkBody('email', '이메일을 입력해주세요.').notEmpty();
  req.checkBody('password', '비밀번호를 입력해주세요.').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('login', { flashes: req.flash() });
    return;
  }

  next();
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) return next(authError);

    if (!user) {
      req.flash('error', info.message);
      res.render('login', { flashes: req.flash() });
      return;
    }

    return req.login(user, (loginError) => {
      if (loginError) return next(loginError);

      return res.redirect('/');
    });
  })(req, res, next);
};

exports.registerForm = (req, res) => {
  res.render('register', {
    title: 'Register',
    flashes: null,
  });
};

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('title');
  req.checkBody('name', 'name을 입력해주세요.').notEmpty();
  req.checkBody('email', 'Email 형식이 아닙니다.').isEmail();
  req.checkBody('password', 'Password을 입력해주세요.').notEmpty();
  req.checkBody('password-confirm', '비밀번호 재확인을 입력해주세요.').notEmpty();
  req.checkBody('password-confirm', '비밀번호가 일치하지 않습니다.').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('register', { flashes: req.flash() });
    return;
  }

  next();
};

exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    req.flash('error', '이미 가입된 이메일입니다.');
    return res.render('register', {  flashes: req.flash() });
  }

  await bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      await User.create({
        name,
        email,
        password: hash,
      });
    });
  });

  req.flash('success', '가입에 성공하였습니다');
  res.status(200).redirect('/');
};

exports.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200).redirect('/');
};
