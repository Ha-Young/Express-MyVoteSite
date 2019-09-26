const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../../models/User');

module.exports = function passport(passport) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALL_BACK_URL
      },
      async function(accessToken, refreshToken, profile, done) {
        try {
          const userData = {
            github_id: profile.id,
            name: profile.username
          };
          const target = await User.findOne({ name: profile.username });
          if (target) {
            return done(null, profile);
          } else {
            new User(userData).save().then(done(null, profile));
          }
        } catch (error) {
          if (error.name === 'CastError') {
            return next();
          } else {
            return next(error);
          }
        }
      }
    )
  );
};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
