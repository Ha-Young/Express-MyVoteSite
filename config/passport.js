const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser(async (user, done) => {
  await User.findById(user, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: true
}, async (email, password, done) => {
  const hash = await User.findOne({ email }, 'password');

  await User.find({ email }, (err, user) => {
    if (err) {
      return done(err);
    }
    if(!user) {
      return done(null, false, { message: 'Incorrect email' });
    }
    if (!bcrypt.compareSync(password, hash.password)) {
      return done(null, false, { message: 'Incorrect password' });
    }
    return done(null, user);
  });
}));

