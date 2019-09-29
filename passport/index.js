const local = require('./localStrategy');
const User = require('../models/User');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(async(email, done) => {
    try {
      const user = await User.findOne({ email })
      done(null, user);
    } catch(err) {
      done(err);
    }
  });

  local(passport);
};
