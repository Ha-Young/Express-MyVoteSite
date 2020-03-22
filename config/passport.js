const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy(
  async (username, password, cb) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return cb(null, false, { message: '가입되지 않은 e-mail입니다.' });

      const valid = user.comparePassword(password, user.password);
      if (!valid) return cb(null, false, { message: '비밀번호가 일치하지 않습니다.' });

      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
