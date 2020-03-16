const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const createError = require('http-errors');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(new LocalStrategy({ usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(createError(404, `Email ${email} not found. Try again :)`));

      const isMatch = await user.comparePassword(password);
      if (!isMatch) return done(createError(404, 'Invalid password. Try again :)'));
      return done(null, user);
    } catch (err) {
      done(err);
    }
  }));

module.exports = passport;
