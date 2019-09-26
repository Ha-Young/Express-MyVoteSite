const local = require('./localStrategy');
const github = require('./githubStrategy');
const User = require('../models/User');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((_id, done) => {
    User.findOne({ _id })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local(passport);
  github(passport);
};
