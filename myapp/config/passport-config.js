const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('./index');

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const targetUser = await User.findOne({ email: profile.emails[0].value }).exec();
        if(targetUser) return done(null, targetUser);
        else {
          const newUser = await new User({
            username: profile.displayName,
            email: profile.emails[0].value
          }).save();
          return done(null, newUser);
        }
      } catch(err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};
