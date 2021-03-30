const createError = require('http-errors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

const config = require('../config');
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
        const user = await User.findOne({ email })?.select('+password');

        if (user && user.isSocial()) {
          return done(null, false, { message: 'email already exist' });
        }

        if (!user || !await user.comparePassword(password)) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        delete user.password;
        return done(null, user);
      } catch (err) {
        console.log(err);
        return done(createError(500));
      }
    }
  ));

  passport.use(new GitHubStrategy({
    clientID: config.githubClientID,
    clientSecret: config.githubClientSecret,
    callbackURL: config.githubCallbackURL
  },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const email = profile.emails[0].value;

        if (!email) {
          return done(createError(403));
        }

        let user = await User.findOne({ email })?.select('+password');

        if (!user) {
          user = await User.create({
            email,
            nickname: profile.username
          });
        }

        if (user && !user.isSocial()) {
          return done(null, false, { message: 'email already exist' });
        }

        delete user.password;
        return done(null, user);
      } catch (err) {
        return done(createError(500));
      }
    }
  ));

  return passport;
}
