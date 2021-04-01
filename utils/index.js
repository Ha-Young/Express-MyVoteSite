const jwt = require('jsonwebtoken');

exports.getDecodedToken = function (token) {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(301).redirect('/login');
    }

    return decoded.id;
  });
};
