const User = require('../../models/User');
const passport = require('passport');
const { LOGIN, ROOT } = require('../../constants/urls');
const { MESSAGE } = require('../../constants/views');
const { WRONG_ID_OR_PASSWORD } = require('../../constants/messages');

exports.registerNewUser = async (req, res, next) => {
  const { email, password, username } = req.body;

  const newUserData = new User({
    email,
    password,
    username,
    votings: [],
  });

  User.create(newUserData, err => {
    if (err) {
      next(err);

      return;
    }

    res.status(302).redirect(LOGIN);
  });
};

exports.passportAuthenticate = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      next(err);

      return;
    }

    if (!user) {
      res.status(200).render(MESSAGE, {
        message: WRONG_ID_OR_PASSWORD
      });

      return;
    }

    req.login(user, err => {
      if (err) {
        next(err);

        return;
      }

      req.session.userId = user._id;

      res.redirect(ROOT);
    });
  })(req, res, next);
};
