const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/Users');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, 'There is no user matches with this email.');
      }

      const { password: hashedPassword } = user;
      const isPasswordValid = await user.validatePassword(password, hashedPassword);

      if (!isPasswordValid) {
        return done(null, false, 'Invalid password.');
      }

      return done(null, user);
    } catch(err) {
      return done(err);
    }
  }
));
