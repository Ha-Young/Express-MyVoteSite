const createError = require('http-errors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(async function (_id, done) {
    try {
      const user = await User.findById(_id).lean();
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
    },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email }).select('+password').lean();

        if (!user || !await user.comparePassword(password)) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        delete user.password;
        return done(null, user);
      } catch (err) {
        done(createError(500));
      }
    }
  ));

  return passport;
}
