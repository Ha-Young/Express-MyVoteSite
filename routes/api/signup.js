const express = require("express");
const router = express.Router();
const User = require("../../models/User");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const failureMessage = require("../../constants/failureMessage");

router.get("/", (req, res) => {
  res.render("signup", { isLoggedIn: false });
});

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    function (req, username, password, done) {
      const email = req.body.email;

      User.findOne(
        { email },
        async function (err, user) {
          if (err) {
            return done(error);
          }

          if (user) {
            return done(
              null,
              false,
              { message: failureMessage.EMAIL_ALREADY_EXIST_MESSAGE }
            );
          }

          const savedUser = await new User(
            {
              "username": username,
              "email": email,
              "password": password
            }
          ).save();

          return done(null, savedUser);
        }
      );
    }
  )
);

router.post(
  "/",
  passport.authenticate(
    "local-signup",
    {
      successRedirect: "/login",
      failureRedirect: "/signup"
    }
  )
);

module.exports = router;
