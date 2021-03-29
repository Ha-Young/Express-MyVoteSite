const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github").Strategy;

const User = require("../models/User");

passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
}, async (email, password, cb) => {
  try {
    if (!email || !password) {
      throw new Error("Bad Request"); // 400번
    }
    
    const user = await User.findOne({ email });
    
    user.comparePassword(password, cb);
  } catch (error) {
    cb(error);
  }
}));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  },
  async (accessToken, refreshToken, profile, cb) => {
    const {
      username: name,
      photos: [{ value: avatar }],
      emails: [{ value: email }],
    } = profile;

    try {
      const user = await User.findOne({ email });

      if (!user) { // undefined인 경우에도 호출..? 왜..?
        const newUser = User({
          email,
          avatar,
          name,
          avatar,
        });

        await newUser.save();
      }
      
      cb(null, user);
    } catch (error) {
      cb(error);
    }
  },
));

passport.serializeUser((user, cb) => {
  cb(null, user)
});

passport.deserializeUser(async (user, cb) => {
  cb(null, user);
});

