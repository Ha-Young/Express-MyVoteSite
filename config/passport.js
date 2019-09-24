const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    User.findById(user._id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (username, password, done) => {
    const user = await User.findOne({ email: username });

    if (!user) {
      return done(null, false, { message: 'Incorrect username or password' });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return done(null, false, { message: 'Incorrect username or password' });
    }

    return done(null, user);
  }));
};
