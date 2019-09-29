const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            const isCorrectPassword = await bcrypt.compare(
              password,
              existingUser.password
            );
            if (isCorrectPassword) {
              done(null, existingUser);
            } else {
              done(null, false, { message: 'It is incorrected password' });
            }
          } else {
            done(null, false, { message: 'It is not registered user' });
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
