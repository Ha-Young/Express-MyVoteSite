const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (user) return done(null, false, { message: '중복된 이메일 입니다' });

          const newUser = new User();
          newUser.email = email;
          newUser.password = newUser.generateHash(password);
          newUser.nickname = req.body.nickname;

          await newUser.save();
          done(null, newUser);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({ email });

          if (!user) return done(null, false, { message: '해당 이메일이 존재하지 않습니다' });
          if (!user.validPassword(password)) return done(null, false, { message: '비밀번호가 틀렸습니다' });

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
