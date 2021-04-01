require('dotenv').config();

const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.TOKEN_SECRET_KEY;
const { INTERNAL_SERVER_ERROR } = require("../../constants/errorMessage");

const generateAccessToken = (payload) => {
  try {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
  } catch (err) {
    return next(createError(500, INTERNAL_SERVER_ERROR));
  }
}

exports.generateAccessToken = generateAccessToken;
