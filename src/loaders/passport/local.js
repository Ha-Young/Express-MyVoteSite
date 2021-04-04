const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/User");
const { validPassword } = require("../../utils/passwordHelper");

const initializeLocal = (passport) => {
  const localOption = {
    usernameField: "email",
    passwordField: "password",
    session: true,
    passReqToCallback: false,
  };

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
    };
  };

  passport.use(new LocalStrategy(localOption, localAuthenticate));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      const deserializedUser = {
        id: user.id,
        username: user.username,
      };

      done(null, deserializedUser);
    } catch (err) {
      console.log("Fail deserializeUser!");
      done(err);
    }
  });
};

module.exports = initializeLocal;