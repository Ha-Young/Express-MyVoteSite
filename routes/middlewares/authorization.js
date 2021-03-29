const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { refreshAccessToken } = require("../../util/jwtHelper");

exports.authenticateToken = (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies.accessToken) {
    next(createError(401, "Unauthorization"));
    return;
  }

  const { accessToken, refreshToken } = req.cookies;

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.log("expired");
        res.cookie("accessToken", refreshAccessToken(refreshToken));
        return;
      }

      return next(createError(403, "Unauthorization"));
    }

    req.user = user;
    next();
  });
};
