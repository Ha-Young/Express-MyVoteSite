const bcrypt = require("bcrypt");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRATION_TIME,
} = require("../constant/token");

module.exports.get = async (req, res, next) => {
  res.status(200).render("login");
};

module.exports.post = async (req, res, next) => {
  const user = req.body;
  console.log(user);

  try {
    const findedUser = await User.findOne({ email: user.email });
    if (!findedUser) {
      res.status(401).json({
        result: false,
        message: "Invalid email or password.",
      });

      return;
    }

    if (!(await bcrypt.compare(user.password, findedUser.password))) {
      res.status(401).json({
        result: false,
        message: "Invalid email or password.",
      });

      return;
    }

    const accessToken = jwt.sign(
      { email: user.email },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: ACCESS_TOKEN_EXPIRATION_TIME }
    );

    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: REFRESH_TOKEN_EXPIRATION_TIME }
    );

    res.cookie(
      ACCESS_TOKEN,
      accessToken,
    );
    res.cookie(
      REFRESH_TOKEN,
      refreshToken,
    );
    res.status(201).json({
      result: true,
    });
  } catch (err) {
    console.log(err);
    next(createError(500, err.message));
  }
}

module.exports.delete = async (req, res, next) => {
  console.log("logout");

  res.clearCookie(ACCESS_TOKEN);
  res.clearCookie(REFRESH_TOKEN);
  res.status(200).end();
};
