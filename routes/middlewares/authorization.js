const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { refreshAccessToken, generateAccessToken } = require("../../util/jwtHelper");

exports.authenticateToken = (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies.accessToken) {
    next(createError(401, "Unauthorization !!!!!"));
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
          next(createError(403, "Refresh / Access all of them expired"));
          return;
        }

        const newAccessToken = generateAccessToken(user, process.env.ACCESS_TOKEN_SECRET, "30m")
        req.cookies.accessToken = newAccessToken;
        next();
      });
      return;
    }
    next(createError(403, err.message));
  }
};
