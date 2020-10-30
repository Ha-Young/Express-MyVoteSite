const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { PASSWORD_WRONG, USER_NOT_EXIST } = require('../constants/constants');

module.exports = passport => {
  passport.use(
    new localStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false, { message: USER_NOT_EXIST });

        bcrypt.compare(password, user.password, (err, match) => {
          if (err) return done(null, false);
          match
            ? done(null, user)
            : done(null, false, { message: PASSWORD_WRONG });
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      cb(err, user);
    });
  });
};
