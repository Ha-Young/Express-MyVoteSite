const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = function passport (passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async function (username, password, done) {
    try {
      const user = await User.findOne({ email: username });

      if (!user) {
        return done(null, false, { message: 'incorrect user_email' });
      }

      const checkedPassword = await bcrypt.compare(password, user.password);

      if (!checkedPassword) {
        return done(null, false, { message: 'incorrect password' });
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
  }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
