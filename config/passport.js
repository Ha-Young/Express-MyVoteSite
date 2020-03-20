const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: true
}, async (email, password, done) => {
  const hash = await User.findOne({ email }, 'password');

  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err);
    }
    if(!user) {
      return done(null, false, 'Incorrect email');
    }
    if (!bcrypt.compareSync(password, hash.password)) {
      return done(null, false, 'Incorrect password');
    }
    return done(null, user);
  });
}));

passport.serializeUser((user, done) => {
  User.findById(user, (err, user) => {
    done(null, user.email);
  })
})

passport.deserializeUser((email, done) => {
  User.findOne({ email }, (err, user) => {
    done(null, user);
  });
});
