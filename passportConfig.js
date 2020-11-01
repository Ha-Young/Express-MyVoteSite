const passport = require('passport');
const bcrypt = require('bcrypt');

const User = require('./models/User');
const { NotExtended } = require("http-errors");
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  try {
    const existUser = await User.findOne({ email: email });

    if (existUser) {
      const isSamePassword = await bcrypt.compare(password, existUser.password);

      if (isSamePassword) {
        done(null, existUser);
      } else {
        done({ message: '비밀번호가 일치하지 않습니다.' });
      }
    } else {
      done({ message: '등록되지 않은 사용자입니다.' });
    }
  } catch (err) {
    done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
