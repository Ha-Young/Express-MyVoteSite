const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
  console.log('seri');
  done(null, user);
});
passport.deserializeUser((user, done) => {
  console.log('deseri');
  done(null, user);
});

passport.use('local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const exUser = await User.findOne({ email });
        if (exUser) {
          const result = await bcrypt.compare(password, exUser.password);
          if (result) {
            done(null, exUser);
          } else {
            done(null, false, { message: '비밀번호가 일치하지 않습니다' });
          }
        } else {
          done(null, false, { message: '가입되지 않은 회원번호입니다' });
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

module.exports = passport;
