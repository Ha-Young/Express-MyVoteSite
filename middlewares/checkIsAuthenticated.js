const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_EXPIRATION_TIME } = require("../constant/tokenExpiresIn");

module.exports.isAuthenticated = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    console.log("checkAccessToken", decodedAccessToken);
    console.log("currentTime", new Date().getTime());

    next();
    return;
  } catch(err) {
    if (err.message === "jwt expired") {
      try {
        console.log("accessToken jwt expired")

        const refreshToken = req.cookies.refreshToken;
        const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);

        console.log("checkRefreshToken", decodedRefreshToken);
        const email = decodedRefreshToken.email;

        const newAccessToken = jwt.sign(
          { email },
          process.env.JWT_ACCESS_KEY,
          { expiresIn: ACCESS_TOKEN_EXPIRATION_TIME }
        );

        res.cookie(
          "accessToken", newAccessToken,
          { maxAge: Number(JWT_ACCESS_KEY.replace(/[^0-9]/g, "")) * 1000 * 60 }
        );
        console.log("create new access token with refreshToken");

        next();
        return;
      } catch (err) {
        if (err.message === "jwt expired") {
          console.log("refreshToken jwt expired")
        }
      }
    }

    res.status(302).redirect("/login");
  }
};

module.exports.isNotAuthenticated = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);

    if (decodedAccessToken) {
      res.status(302).redirect("/");
      return;
    }

    const refreshToken = req.cookies.refreshToken;
    const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);

    if (decodedRefreshToken) {
      res.status(302).redirect("/");
      return;
    }
  } catch(err) {
    next();
  }
};
