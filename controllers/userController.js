const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const routes = require('../constants/routes');

module.exports = {
  getSignUp: (req, res, next) => {
    res.render('signup');
  },

  postSignUp: async (req, res, next) => {
    const {
      username,
      email,
      password,
      'password-confirm': passwordConfirm,
    } = req.body;
    const userData = { username, email, password, passwordConfirm };

    if (password !== passwordConfirm) {
      res.render('signup', {
        ...userData,
        error: '비밀번호를 일치시켜주세요.',
      });
      return;
    }

    try {
      const userData = await User.findOne({ username });

      if (userData) {
        res.render('signup', {
          userData,
          error: '동일한 닉네임이 존재합니다.',
        });

        return;
      }
    } catch (err) {
      next(err);
      return;
    }

    try {
      const userData = await User.findOne({ email });

      if (userData) {
        res.render('signup', {
          userData,
          error: '동일한 이메일이 존재합니다.',
        });

        return;
      }
    } catch (err) {
      next(err);
      return;
    }

    try {
      const hasedPassword = await bcrypt.hash(password, 10);
      userData.password = hasedPassword;
    } catch (err) {
      next(err);
      return;
    }

    try {
      await User.create(userData);
    } catch (err) {
      next(err);
      return;
    }

    res.redirect(routes.login);
  },

  getLogin: (req, res, next) => {
    res.render('login');
  },

  postLogin: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      console.log(info);

      if (err) return next(err);
      if (!user) return res.redirect(routes.login);

      req.logIn(user, (err) => {
        if (err) return next(err);

        const redirectUrl = req.session.redirectUrl || routes.home;
        delete req.session.redirectUrl;

        return res.redirect(redirectUrl);
      });
    })(req, res, next);
  },

  logout: (req, res, next) => {
    req.session.destroy((err) => {
      if (err) return next(err);

      req.logout();
      res.redirect(routes.home);
    });
  },
};
