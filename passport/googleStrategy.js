const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const GoogleUser = require('../models/Google-user')

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  GoogleUser.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect'
  }, (accessToken, refreshToken, profile, done) => {
    GoogleUser.findOne({ googleId: profile.id }).then((currentUser) => {
      if (currentUser) {
        done(null, currentUser);
      } else {
        new GoogleUser({
          googleId: profile.id,
          userName: profile.displayName,
          thumbnail: profile._json.picture,
          locale: profile._json.locale
        }).save().then((newUser) => {
          done(null, newUser);
        });
      }
    });
  })
);
