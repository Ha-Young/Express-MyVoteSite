const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/Users');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username });

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const { password: hashedPassword } = user;
      const isPasswordValid = await user.validatePassword(password, hashedPassword);
      if (!isPasswordValid) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch(err) {
      return done(err);
    }
  }
));
