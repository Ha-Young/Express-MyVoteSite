const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/Users');

passport.use(new LocalStrategy(
  async (username, password, done) => {
    console.log('username', username);
    console.log('password', password);

    try {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch(err) {
      return done(err);
    }
  }
));
