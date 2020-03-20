const local = require('./localStrategy');
const User = require('../models/User');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      if (user) {
        done(null, user);
      }
    } catch (err) {
      done(err);
    }
  });

  local(passport);
}
