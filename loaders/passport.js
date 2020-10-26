const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const googleAuth = require('../config').googleAuth;
const User = require('../models/User');

passport.use(User.createStrategy());

passport.use(
  new GoogleStrategy(
    {
      clientID: googleAuth.clientID,
      clientSecret: googleAuth.clientSecret,
      callbackURL: googleAuth.callbackURL,
    },
    async function (accessToken, refreshToken, profile, done) {
      const {
        email,
        name: displayName,
        sub: googleId,
        picture: photoUrl,
      } = profile._json;

      try {
        const user = await User.findOne({ email });

        if (!user) {
          const newUser = await User.create({
            email,
            displayName,
            googleId,
            photoUrl,
          });

          return done(null, newUser);
        }

        user.displayName = displayName;
        user.googleId = googleId;
        user.photoUrl = photoUrl;
        await user.save();

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
