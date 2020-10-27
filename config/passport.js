const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = passport => {
  passport.use(
    new localStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email: email }, (err, data) => {
        if (err) throw err;
        if (!data) return done(null, false, { message: '존재하지 않는 사용자입니다.' });

        bcrypt.compare(password, data.password, (err, match) => {
          if (err) return done(null, false);
          if (!match) return done(null, false, { message: '패스워드가 일치하지 않습니다.' });
          if (match) return done(null, data);
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