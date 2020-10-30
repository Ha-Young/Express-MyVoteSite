const passport = require('passport');
const { LOGIN, ROOT } = require('../../constants/urls');
const { MESSAGE } = require('../../constants/views');
const { WRONG_ID_OR_PASSWORD } = require('../../constants/messages');
const UserService = require('../../services/user.service');

exports.registerNewUser = async (req, res, next) => {
  const { email, password, username } = req.body;

  try {
    new UserService().registerUser(email, password, username);

    res.status(302).redirect(LOGIN);
  } catch (err) {
    next(err);
  }
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
