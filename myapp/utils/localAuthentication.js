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
          return done(null, user, { message: "Login Success" });
        } else {
          return done(null, false, { message: "Incorrect Password" });
        }
      } catch {
        return done(null, false, { message: "Internal Server Error" });
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findOne({ _id: userId });
    return done(null, user);
  } catch {
    return done(null, false, { message: "Internal Server Error" });
  }
});
