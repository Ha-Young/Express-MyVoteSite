const local = require('./localStrategy');
const User = require('../models/Users');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser((email, done) => {
    console.log('될까요???', email);
    User.findOne({ email })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local(passport);
};

