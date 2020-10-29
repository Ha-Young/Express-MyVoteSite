const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { entryErrorMessage } = require('../constants');
const { PASSWORD_NOT_MATCHED, USER_NOT_EXIST } = entryErrorMessage;

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const existedUser = await User.findOne({ email: email });
      if (existedUser) {
        const result = await bcrypt.compare(password, existedUser.password);
        if (!result) {
          return done(null, false, { message: PASSWORD_NOT_MATCHED });
        }
        return done(null, existedUser);
      }
      return done(null, false, { message: USER_NOT_EXIST });
    } catch (error) {
      return done(error);
    }
  }));
};
