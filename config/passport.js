const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const { ERROR } = require('../constants/index');

module.exports = () => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async function (
      email,
      password,
      done
    ) {
      let user;
      let isPasswordSame;

      try {
        user = await User.findOne({ email });
      } catch (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: ERROR.INCORRECT_EMAIL });
      }

      try {
        isPasswordSame = await bcrypt.compare(password, user.password);
      } catch (err) {
        return done(err);
      }

      if (!isPasswordSame) {
        return done(null, false, { message: ERROR.INCORRECT_PASSWORD });
      }

      return done(null, user);
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (userId, done) => {
    try {
      const user = await User.findById(userId);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
