const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("./model/User");

const cookieExtractor = function(req) {
  let token = {};
  if (req && req.cookies) {
      token.access = req.cookies["access"];
      token.refresh = req.cookies["refresh"];
  }

  return token;
};

passport.use(new LocalStrategy(
  function(email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) return done(err);
      if (!user) return done(null, false);
      if (!user.verifyPassword(password)) return done(null, false);
      return done(null, user);
    });
  }
));

// 저장되어있는 토큰을 꺼내다가 확인하고 재발급까지 해준다. 만약 없다면 signin페이지로 리다이렉트
passport.use(new JwtStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET
}, function(jwt_payload, done) {
  const now = Date.now().valueOf() / 1000;
  const accessToken = jwt.decode(jwt_payload.access);

  if (!accessToken && accessToken.exp < now) {
    const refreshToken = jwt.decode(jwt_payload.refresh);
    if (!refreshToken || refreshToken.exp < now) {
      // refreshToken also none or expired!!
      return res.redirect("/signin");
    }
  }

  const { _id, email } = refreshToken;
  console.log('payload : ', jwt_payload);
  User.findOne({ email: accessToken.email }, function(err, user) {
    console.log(err, user);
    if (err) {
      return done(err, false);
    }

    if (user && user._id === _id && email === accessToken.email) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
