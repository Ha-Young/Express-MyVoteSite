const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const { WRONG_ID_OR_PASSWORD } = require('../constants/messages');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      let isPasswordCorrect;

      if (user) {
        isPasswordCorrect = await bcrypt.compare(password, user.password);
      }

      if (!user || !isPasswordCorrect) {
        done(null, false, { message: WRONG_ID_OR_PASSWORD });

        return;
      }

      done(null, user);
    } catch (err) {
      done(err);
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
