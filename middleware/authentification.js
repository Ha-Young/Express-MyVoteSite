const jwt = require("jsonwebtoken");
const User = require("../model/User")

module.exports.authToken = function authToken(req, res, next) {
  const now = Date.now().valueOf() / 1000;

  const accessToken = jwt.decode(req.cookies["access"]);

  if (!accessToken || accessToken.exp < now) {
    // none or expired!!
    const refreshToken = jwt.decode(req.cookies["refresh"]);
    if (!refreshToken || refreshToken.exp < now) {
      // refreshToken also none or expired!!
      // 로그인에선 무조건 accessToken이랑 refreshToken을 재발급
      return res.redirect("/signin");
    }

    // refresh!!!
    const accessTokenUser = User.findOne({ email: accessToken.email }).lean();
    const { _id, email } = refreshToken;

    if (accessTokenUser._id !== _id || accessToken.email !== email) {
      res.cookie("warningMessage", "Authentification Fail, Please Sign In again", { httpOnly: true });
      return res.redirect("/signIn");
    }

    res.clearCookie("access", { httpOnly: true });
    res.cookie("access", jwt.sign({
        email,
      },
      process.env.JWT_SECRET, {
        expiresIn: "30m",
      })
    );
  }

  next();
}
