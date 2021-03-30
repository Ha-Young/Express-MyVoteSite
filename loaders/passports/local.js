const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const initialize = (passport, getUserByEmail) => {
  const authenticate = async (id, password, done) => {
    const user = await getUserById(id);

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
    usernameField: 'id',
    passwordField: 'password',
    session: true,
    passReqToCallback: false,
  }, authenticate));

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser(async (user, done) => {
    done(null, await getUserById(user.id));
  });
};

module.exports = initialize;
