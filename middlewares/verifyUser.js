const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.verifyUser = async function (req, res, next) {
  // REVIEW token이 다른곳에 담겨서 넘어올수도 있나??
  await jwt.verify(req.cookies.access_token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(301).redirect('/login');
    }

    req.user = mongoose.Types.ObjectId(decoded.id);

    next();
  });
}
