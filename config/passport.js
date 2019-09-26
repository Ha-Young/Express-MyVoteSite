const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await User.findById(id);

      if (user) {
        return done(null, user);
      }

      return done(new Error('User Not Found'));
    } catch(err) {
      done(err);
    }
  });

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });

        if (user) {
          const result = await bcrypt.compare(password, user.password);

          return result ?
            done(null, user) :
            done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, false, { message: 'Incorrect username.' });
      } catch(err) {
        done(err);
      }
    }
  ));
}
