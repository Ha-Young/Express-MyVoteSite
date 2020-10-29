const User = require('../../models/User');
const passport = require('passport');

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

    res.status(302).redirect('/login');
  });
};

exports.passportAuthenticate = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      next(err);

      return;
    }

    if (!user) {
      res.status(200).render('message', {
        message: '아이디 또는 비밀번호가 틀렸습니다'
      });

      return;
    }

    req.login(user, err => {
      if (err) {
        next(err);

        return;
      }

      req.session.userId = user._id;

      res.redirect('/');
    });
  })(req, res, next);
};
