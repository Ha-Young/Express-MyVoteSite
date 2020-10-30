const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  {
    usernameField: 'id',
    passwordField: 'password'
  },
  function (username, password, done) {
    User.findOne({ id: username }, (err, user) => {
      if (err) { return done(err); }

      if (!user) {
        return done(null, false, { message: 'Incorrect E-MAIL' });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password' });
        }
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  User.findById(user._id, function(err, user) {
    done(err, user);
  });
});
