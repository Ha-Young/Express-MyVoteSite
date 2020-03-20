const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (userId, done) => {
    try {
      const user = await User.findById(userId);

      if (user) return done(null, userId);
    } catch (err) {
      done(err);
    }
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: true
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });

          if (!user) return done(null, false, { message: '존재하지 않는 유저입니다.' });
          if (bcrypt.compareSync(password, user.password)) return done(null, user);

          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
