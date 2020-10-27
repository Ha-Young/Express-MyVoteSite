const passport = require('passport');
const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((username, password, done) => {
  console.log('여기---------------------');
  User.findOne({ username: username },
    (err, user) => {
      console.log(user);
      if (err) return done(err);
      if (!user) {
        return done(null, false, { message: '아이디 또는 비밀번호가 맞지 않습니다' });
      }
      if (!user.verifyPassword(password)) {
        return done(null, false, { message: '아이디 또는 비밀번호가 맞지 않습니다' });
      }
      return done(null, user);
    }
  );
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
