const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../Model/User');
const bcrypt = require('bcrypt');

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
        return done(null, false, { message: 'Incorrect username.' });
      }

      try {
        isPasswordSame = await bcrypt.compare(password, user.password);
      } catch (err) {
        return done(err);
      }

      if (!isPasswordSame) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(async function (userId, done) {
    try {
      const user = await User.findById(userId);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
