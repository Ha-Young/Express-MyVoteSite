const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');
const {
  userNotFound,
  incorrectName,
  incorrectPassword
} = require('../constants/err-messages');

module.exports = function(passport) {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findById(id);

      if (user) {
        return done(null, user);
      }

      done(new Error(userNotFound));
    } catch(err) {
      done(err);
    }
  });

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async function(email, password, done) {
      try {
        const user = await User.findOne({ email: email });

        if (user) {
          const match = await bcrypt.compare(password, user.password);

          return match ?
            done(null, user) :
            done(null, false, { message: incorrectPassword });
        }

        done(null, false, { message: incorrectName });
      } catch(err) {
        done(err);
      }
    }
  ));
};
