const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new Strategy(
  async function(username, password, cb) {
    try {
      const user = await User.findOne({ username }).exec();
      console.log(username, password, user);
      if (!user) return cb(null, false);
      if (user.password != password) return cb(null, false);
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }

    // db.users.findByUsername(username, function(err, user) {
    //   if (err) { return cb(err); }
    //   if (!user) { return cb(null, false); }
    //   if (user.password != password) { return cb(null, false); }
    //   return cb(null, user);
    // });
  })
);

passport.serializeUser(function(user, cb) {
  // console.log('serialize', user);
  cb(null, user._id);
});

passport.deserializeUser(async function(id, cb) {
  try {
    const user = await User.findById(id);
    // console.log('deserialize', user);
    cb(null, user);
  } catch (err) {
    return cb(err);
  }

  // db.users.findById(id, function (err, user) {
  //   if (err) { return cb(err); }
  //   cb(null, user);
  // });
});