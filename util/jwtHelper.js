const jwt = require("jsonwebtoken");

exports.generateAccessToken = (user, key, expiredDate) => {
  return jwt.sign({ name: user.name, email: user.email }, key, { expiresIn: expiredDate });
};

exports.refreshAccessToken = (refreshToken) => {
  if (refreshToken === null) return res.status(401);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403);

    return this.generateAccessToken(user, process.env.ACCESS_TOKEN_SECRET, "15m");
  });
};

exports.getUserInfo = (cookies) => {
  if (cookies.accessToken) {
    return jwt.verify(cookies.accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return null;
      return user;
    });
  } else {
    return null;
  }
};
