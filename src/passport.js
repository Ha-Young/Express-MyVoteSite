const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!user || !isPasswordCorrect) {
        done(null, false, { message: '아이디 또는 비밀번호가 맞지 않습니다' });

        return;
      }

      done(null, user);
    } catch (err) {
      done(error);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
