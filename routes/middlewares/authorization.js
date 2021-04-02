const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const {
  UNAUTHORIZED_TOKEN_ERROR,
  FAILED_TO_DECODE_TOKEN_ERROR
} = require("../../constants/errorMessage");

const SECRET_KEY = process.env.TOKEN_SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.cookies.user;

  if (!token) {
    return res.redirect(301, "/login");
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload;
    res.locals.user = payload;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return next(createError(401, UNAUTHORIZED_TOKEN_ERROR));
    }
    return next(createError(400, FAILED_TO_DECODE_TOKEN_ERROR));
  }
}

exports.verifyToken = verifyToken;
