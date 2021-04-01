const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { generateToken } = require("../../util/jwtHelper");

exports.authenticateToken = (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies.accessToken) {
    res.status(301).redirect(`/users/login`);
    return;
  }

  const { accessToken, refreshToken } = req.cookies;

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
