const passport = require('passport');
const User = require('../models/user');
const UserService = require('../services/userService');
const routes = require('../constants/routes');

const userServiceInstance = new UserService(User);

module.exports = {
  getSignUp: (req, res, next) => {
    res.render('signup');
  },

  postSignUp: async (req, res, next) => {
    const userData = res.locals.userData;

    try {
      await userServiceInstance.createUser(userData);
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
