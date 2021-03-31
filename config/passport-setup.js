const passport = require('passport');
const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  console.log('serialized');
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  // eslint-disable-next-line consistent-return
  async (email, password, done) => {
    try {
      const userInfo = await User.findOne({ email });
      if (!userInfo) {
        return done(null, false, {
          message: '가입되지 않은 계정입니다.',
        });
      }
      bcrypt.compare(password, userInfo.password, (err, res) => {
        if (err) return done(err);
        if (!res) {
          return done(null, false, {
            message: '비밀번호를 확인하세요',
          });
        }
        return done(null, userInfo);
      });
    } catch (err) {
      return done(err);
    }
  },
));
