const jwt = require('jsonwebtoken');

exports.verifyUser = async function (req, res, next) {
  // REVIEW token이 다른곳에 담겨서 넘어올수도 있나??
  await jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.status(301).redirect('/login');
    }

    next();
  });
}
