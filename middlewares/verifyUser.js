const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/User');

exports.verifyUser = async function (req, res, next) {
  try {
    await jwt.verify(req.cookies.access_token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(301).redirect('/login');
      }

      if (!req.user) {
        res.locals.user = await User.findById(decoded.id);
        req.user = res.locals.user._id;
      }

      next();
    });
  } catch (err) {
    next(createError(500, err));
  }
};
