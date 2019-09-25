const User = require('../../models/User');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = function passport(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'name',
        passwordField: 'password'
      },
      async function(name, password, done) {
        try {
          const loginUser = await User.findOne({
            name: name
          });
          if (loginUser) {
            const result = await bcrypt.compare(password, loginUser.password);
            if (result) {
              return done(null, loginUser);
            } else {
              return done(null, false, { message: 'Incorrect password.' });
            }
          } else {
            return done(null, false, { message: 'Incorrect username.' });
          }
        } catch (error) {
          if (error.name === 'CastError') {
            return next();
          } else {
            return next(error);
          }
        }
      }
    )
  );
};
