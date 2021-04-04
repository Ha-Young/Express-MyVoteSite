const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github").Strategy;

const User = require("../models/User");

const { ErrorHandler } = require("../util/error");
const { SERVER_ERROR } = require("../constants/error");

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, cb) => {
      try {
        const user = await User.findOne({ email });

        if (user) {
          req.flash(CLIENT_ERROR.LOGIN_ERROR, "already exists");
          
          return;
        }

        const newUser = User(req.body);

        await newUser.validate();
        await newUser.save();

        cb(null, true);
      } catch (error) {
        cb(error);
      }
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
      session: false,
    },
    async (req, email, password, cb) => {
      try {
        if (!email || !password) {
          throw new ErrorHandler(400, SERVER_ERROR.BAD_REQUEST);
        }

        const user = await User.findOne({ email });

        if (user) {
          user.comparePassword(password, cb);

          return;
        }

        cb(null, false);
      } catch (error) {
        cb(error);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      session: false,
    },
    async (accessToken, refreshToken, profile, cb) => {
      const {
        username: name,
        photos: [{ value: avatar }],
        emails: [{ value: email }],
      } = profile;

      try {
        const user = await User.findOne({ email });

        if (!user) {
          const newUser = User({
            email,
            name,
            avatar,
          });

          await newUser.save();
        }

        cb(null, user);
      } catch (error) {
        cb(error);
      }
    }
  )
);
