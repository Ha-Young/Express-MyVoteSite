const bcrypt = require("bcrypt");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const {
  ACCESS_TOKEN_EXPIRATION_TIME,
  ACCESS_TOKEN_EXPIRATION_TIME_MILISECOND,
  REFRESH_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_EXPIRATION_TIME_MILISECOND,
} = require("../constant/tokenExpiresIn");

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
      "accessToken",
      accessToken,
      { maxAge: ACCESS_TOKEN_EXPIRATION_TIME_MILISECOND }
    );
    res.cookie(
      "refreshToken",
      refreshToken,
      { maxAge: REFRESH_TOKEN_EXPIRATION_TIME_MILISECOND }
    );
    res.status(201).json({
      result: true,
    });
  } catch (err) {
    console.log(err);
    next(createError(500, err.message));
  }
}
