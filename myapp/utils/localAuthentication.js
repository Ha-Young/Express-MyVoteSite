const passport = require("passport");
const crypto = require("crypto");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      const cryptoPassword = crypto
        .createHash("sha512")
        .update(password)
        .digest("base64");

      try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: "Incorrect Email" });

        if (user.password === cryptoPassword) {
          done(null, user, { message: "Login Success" });
        } else {
          done(null, false, { message: "Incorrect Password" });
        }
      } catch {
        done(null, false, { message: "Internal Server Error" });
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findOne({ _id: userId });
    done(null, user);
  } catch {
    done(null, false, { message: "Internal Server Error" });
  }
});
