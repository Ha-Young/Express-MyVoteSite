const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');

const User = require('../models/User');

passport.serializeUser(function (user, done) {
  done(null, user)
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  (email, password, done) => {
    User.findOne({ email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }

      crypto.randomBytes(64, (err, buf) => {
        crypto.pbkdf2(password, user.salt, 14282, 64, 'sha512', (err, key) => {
          if (user.password === key.toString('base64')) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    });
  }
));
