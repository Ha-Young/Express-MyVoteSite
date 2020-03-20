const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

passport.use(new Strategy(
  async function(username, password, cb) {
    try {
      const user = await User.findOne({ username }).exec();
      if (!user) return cb(null, false);

      const match = await bcrypt.compare(password, user.password);
      if (!match) return cb(null, false);
      
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  })
);

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(async function(id, cb) {
  try {
    const user = await User.findById(id);
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});
