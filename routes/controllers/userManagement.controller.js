const passport = require('passport');
const { LOGIN } = require('../../constants/urls');
const { MESSAGE } = require('../../constants/views');
const { WRONG_ID_OR_PASSWORD } = require('../../constants/messages');
const UserService = require('../../services/user.service');
const tryCatchWrapper = require('../../utils/tryCatchWrapper');

exports.registerNewUser = tryCatchWrapper(async (req, res) => {
  const { email, password, username } = req.body;
  new UserService().registerUser(email, password, username);
  res.status(302).redirect(LOGIN);
});

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

      res.redirect(req.body.referer);
    });
  })(req, res, next);
};
