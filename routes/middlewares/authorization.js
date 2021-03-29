require("dotenv").config();

const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const verifyToken = (req, res, next) => {
  const token = req.headers["access_token"];

  try {
    jwt.verify(token, process.env.JWT_SECRETKEY);

    next();
  } catch {
    next(createError(401, "unauthorized user"));
  }
};

module.exports = verifyToken;
