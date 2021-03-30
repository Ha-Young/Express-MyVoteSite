const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.addUserInfo = async function (req, res, next) {
  if (req.cookies.access_token) {
    await jwt.verify(req.cookies.access_token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(301).redirect('/login');
      }
      // REVIEW 좀 이상한가?
      res.locals.user = await User.findById(decoded.id);
      req.user = res.locals.user._id;

      next();
    });
  } else {
    next();
  }
}
