const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../models/User");

const initialize = (passport) => {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_PASSWORD,
      callbackURL: "/users/login-google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const googleProfile = profile._json;
      const isSignedIn = await User.findOne({ email: googleProfile.email });

      if (!isSignedIn) {
        const user = new User({
          name:  googleProfile.name,
          email: googleProfile.email,
          is_google_loggedin: true
        });
        await user.save();
      }

      return done(null, googleProfile);
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

module.exports = initialize;
