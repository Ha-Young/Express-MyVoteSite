const passport = require('passport');
const bcrypt = require('bcrypt');

const User = require('../../models/User');

exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return next();

  res.status(301).redirect('/login');
};

/*exports.isNotLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return res.status(301).redirect('/');

  next();
};*/

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login', flashes: null });
};

exports.validateLogin = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();

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
    if (authError) {
      console.log('authError', authError);
      return next(authError);
    }

    if (!user) {
      req.flash('error', info.message);
      return res.render('login', { flashes: req.flash() });
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }

      req.flash('success', '로그인에 성공하였습니다.');
      return res.redirect('/');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
}

exports.registerForm = (req, res) => {
  res.render('register', {
    title: 'Register',
    flashes: null,
  });
};

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  /*req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extendsion: false,
    gmail_remove_subaddress: false,
  });*/
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password-confirm', 'Confirm password is required').notEmpty();
  req.checkBody('password-confirm', 'Passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('register', { flashes: req.flash() });
    return;
  }

  next();
};

exports.register = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      req.flash('error', '이미 가입된 이메일입니다.');
      res.render('register', {  flashes: req.flash() });
    }
    await bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        User.create({
          name,
          email,
          password: hash,
        });
      });
    });

    req.flash('success', '가입에 성공하였습니다');
    return res.redirect('/');
  } catch (error) {
    return next(error);
  }
};

exports.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
};
