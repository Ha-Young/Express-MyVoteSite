const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const initialize = (passport, getUserByEmail) => {
  const authenticate = async (email, password, done) => {
    const user = await getUserByEmail(email);

    if (user === null) {
      return done(null, false, { message: '등록되지 않은 Email 입니다.' });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: '비밀번호가 맞지 않습니다.' });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true,
    passReqToCallback: false,
  }, authenticate));

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser(async (user, done) => {
    done(null, await getUserByEmail(user.email));
  });
};

module.exports = initialize;
