const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, username, password, done) => {
    console.log('login req',req);
    console.log('username', username);
    console.log('password', password);
    const user = await User.findOne({ email: username });

    if (!user) {
      console.log('Incorrect username');
      return done(null, false, { message: 'Incorrect username or password' });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      console.log('Incorrect password');
      return done(null, false, { message: 'Incorrect username or password' });
    }

    return done(null, user);
  }));
};
