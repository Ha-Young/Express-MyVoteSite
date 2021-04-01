const jwt = require("jsonwebtoken");

exports.generateToken = (user, key, expiredDate) => {
  return jwt.sign({ name: user.name, email: user.email }, key, { expiresIn: expiredDate });
};

exports.getUserInfo = (cookies) => {
  console.log(cookies);
  if (cookies.accessToken) {
    return jwt.verify(cookies.accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return null;
      return user;
    });
  } else {
    return null;
  }
};
