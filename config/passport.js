const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.serializeUser(async (user, done) => {
  await User.findById(user, (err, user) => {
    done(null, user.email);
  }) // => done의 두번째 인자는 session에 저장될 유저의 식별자
})

passport.deserializeUser(async (email, done) => {
  await User.findOne({ email }, (err, user) => {
    done(null, user); // => 페이지를 방문할 때마다 지정된 식별자를 기준으로
    // 애플리케이션에서 필요한 유저의 정보를 가져옴
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: true
}, async (email, password, done) => {
  const hash = await User.findOne({ email }, 'password');

  await User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err);
    }
    if(!user) {
      return done(null, false, { message: 'Incorrect email' });
    }
    if (!bcrypt.compareSync(password, hash.password)) {
      return done(null, false, { message: 'Incorrect password' });
    }
    return done(null, user);
  });
}));

