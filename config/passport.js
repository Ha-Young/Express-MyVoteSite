const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/Users');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, '일치하는 유저가 없습니다.');
      }

      const { password: hashedPassword } = user;
      const isPasswordValid = await user.validatePassword(password, hashedPassword);

      if (!isPasswordValid) {
        return done(null, false, '비밀번호가 일치하지 않습니다.');
      }

      return done(null, user);
    } catch(err) {
      return done(err);
    }
  }
));
