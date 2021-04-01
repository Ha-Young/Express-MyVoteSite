const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

exports.verifyUser = async function (req, res, next) {
  // REVIEW token이 다른곳에 담겨서 넘어올수도 있나??
  await jwt.verify(req.cookies.access_token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(301).redirect('/login');
    }
    // REVIEW 좀 이상한가?
    if (!req.user) {
      res.locals.user = await User.findById(decoded.id);
      req.user = res.locals.user._id;
    }

    next();
  });
};
