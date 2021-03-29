const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../models/User');

passport.use(new Strategy(
  (username, password, cb) => {
    User.findByUsername(username, (err, user) => {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password !== password) { return cb(null, false); }
      return cb(null, user);
    });
  },
));

passport.serializeUser((user, done) => {
  console.log('serialize');
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  }).catch(err => console.log(err.message));
});
