const kakaoStrategy = require('passport-kakao').Strategy;
const User = require('../models/User');

module.exports = passport => {
  passport.use(
    new kakaoStrategy(
      {
        clientID: process.env.CLEINT_ID,
        callbackURL: process.env.CALLBACK_URL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            email: profile._json.kaccount_email
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile._json.kaccount_email,
              nickname: profile.displayName,
              provider: profile.provider
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
