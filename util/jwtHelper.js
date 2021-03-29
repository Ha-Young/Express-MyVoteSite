const jwt = require("jsonwebtoken");

exports.generateAccessToken = (user, key, expiredDate) => {
  return jwt.sign({ name: user.name }, key, { expiresIn: expiredDate });
};

exports.refreshAccessToken = (refreshToken) => {
  if (refreshToken === null) return res.status(401);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403);

    return this.generateAccessToken(user, process.env.ACCESS_TOKEN_SECRET, "15m");
  });
};
