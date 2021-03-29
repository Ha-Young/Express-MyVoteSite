const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const User = require("./models/User");

const validPassword = (password, hash, salt) => {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return hash === hashVerify;
};

const genPassword = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto.pbkdf2Sync(password, sync, 10000, 64, "sha512").toString("hex");

  return {
    salt: salt,
    hash: genHash
  };
};

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const isExistUser = await User.findOne({ username: username });

      if (!isExistUser) {
          done(null, false);
          return;
        }

      const isValid = validPassword(password, isExistUser.hash, isExistUser.salt);

      if (isValid) {
        done(null, isExistUser);
        return;
      }

      done(null, false);
    } catch (err) {
      console.log(err);
      done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      console.log(err);
      done(err);
      return;
    }

    done(null, user);
  });
});

module.exports = passport;
