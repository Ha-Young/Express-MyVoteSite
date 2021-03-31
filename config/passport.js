const passport = require("passport");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

dotenv.config();

const User = require("../models/User");

const extractCookie = (req) => {
  return req.cookies ? req.cookies["jwt"] : null;
};

module.exports = () => {
  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: false,
      },
      async function (email, password, done) {
        try {
          const user = await User.findOne({ email });

          if (!user) {
            return done(null, false);
          }

          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/login/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        return done(null, profile._json);
      }
    )
  );

  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: extractCookie,
        secretOrKey: process.env.JWT_SECRET_KEY,
        session: false,
      },
      async function (jwtPayload, done) {
        try {
          const user = await User.findById(jwtPayload._id);

          try {
            if (!user) {
              return done(null, false);
            }

            return done(null, user);
          } catch (error) {
            return done(error);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
