const jwt = require("jsonwebtoken");

const {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRATION_TIME,
} = require("../constant/token");
const { ORIGINAL_URL } = require("../constant/login");

module.exports.isAuthenticated = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    console.log("checkAccessToken", decodedAccessToken);
    console.log("currentTime", new Date().getTime());

    res.locals.userEmail = decodedAccessToken.email;

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

        res.cookie(ACCESS_TOKEN, newAccessToken);
        console.log("create new access token with refreshToken");

        res.locals.userEmail = email;

        next();
        return;
      } catch (err) {
        if (err.message === "jwt expired") {
          console.log("refreshToken jwt expired")
        } else {
          console.log(err);
        }
      }
    }

    next();
  }
};

module.exports.redirectIfNotLoggedIn = async (req, res, next) => {
  if (!res.locals.userEmail) {
    console.log("Unauthenticated!", req.method);
    res.cookie(ORIGINAL_URL, req.originalUrl);
    console.log("originalURL", req.originalUrl);

    if (req.method === "GET") {
      res.status(302).redirect("/login");
    } else {
      res.status(401).json({ result: false });
    }
  } else {
    next();
  }
}

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
