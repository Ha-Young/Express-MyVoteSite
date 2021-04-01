const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github").Strategy;

const User = require("../models/User");

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, cb) => {
      console.log(req);
      try {
        const user = await User.findOne({ email });

        if (user) {
          throw new Error("user exists");
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
      session: false,
    },
    async (email, password, cb) => {
      try {
        if (!email || !password) {
          throw new Error("Bad Request"); // 400번 // validate로 가라..
        }

        const user = await User.findOne({ email });

        if (user) {
          user.comparePassword(password, cb);
          return;
        }

        cb("wrong email", false); // 메시지 빼주고 throw로 바꾸기....
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
          // undefined인 경우에도 호출..? 왜..?
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
