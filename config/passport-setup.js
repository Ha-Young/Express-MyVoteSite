const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  console.log('serialized');
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false);
      }
      if (user.password !== password) { return done(null, false); }
      return done(null, user);
    });
  },
));
