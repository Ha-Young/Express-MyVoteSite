const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { generateToken } = require("../../util/jwtHelper");

exports.authenticateUser = (req, res, next) => {
  if (req.user) {
    this.authenticateGoogle(req, res, next);
  } else if (req.session.accessToken) {
    this.authenticateToken(req, res, next);
  } else {
    // res.status(401).end();
    res.redirect("/users/login");
  }
};

exports.authenticateToken = (req, res, next) => {
  const cookies = req.session;

  if (!cookies.accessToken) {
    res.status(301).redirect(`/users/login`);
    return;
  }

  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          next(createError(403, "접근 권한이 없는 페이지입니다."));
          return;
        }

        const newAccessToken = generateToken(user, process.env.ACCESS_TOKEN_SECRET, "2h");
        req.cookies.accessToken = newAccessToken;
        next();
      });
      return;
    }
    next(createError(403, "접근 권한이 없는 페이지입니다."));
  }
};

exports.authenticateGoogle = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  res.status(401).redirect("/login");
};
