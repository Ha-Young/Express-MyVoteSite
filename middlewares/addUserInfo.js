const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/User');

exports.addUserInfo = async function (req, res, next) {
  try {
    if (req.cookies.access_token) {
      await jwt.verify(req.cookies.access_token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          res.clearCookie('access_token');
        } else {
          res.locals.user = await User.findById(decoded.id);
          req.user = res.locals.user._id;
        }

        next();
      });
    } else {
      next();
    }
  } catch (err) {
    next(createError(500, err));
  }
};
