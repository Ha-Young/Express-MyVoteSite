const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/User");
const { validPassword } = require("../../utils/passwordHelper");

const initializeLocal = (passport) => {
  const localAuthenticate = async (email, password, done) => {
    try {
      const isExistUser = await User.findOne({ email });

      if (!isExistUser) {
        console.log("Invaild email!");
        done(null, false);
        return;
      }

      const isValid = validPassword(password, isExistUser.hash, isExistUser.salt);

      if (isValid) {
        console.log("Our user!");
        done(null, isExistUser);
        return;
      }

      console.log("Invalid password!");
      done(null, false);
    } catch (err) {
      console.log(err);
      done(err);
    }
  }

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true,
    passReqToCallback: false,
  },
  localAuthenticate
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);

      done(null, {
        id: user.id,
        username: user.username,
      });
    } catch (err) {
      console.log("Fail deserializeUser!");
      done(err);
      return;
    }
  });
};

module.exports = initializeLocal;
