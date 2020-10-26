const LocalStrategy = require('passport-local').Strategy;
const User = require('./routes/models/User');
const passport  = require('passport');

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      const result = await bcrypt.compare(password, user.password);

      if (!result) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
  ));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({
      email: id.email,
    });
    done(null, user)
  } catch (err) {
    done(err)
  }
});
