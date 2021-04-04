const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verifyAddVote = async function (req, res, next) {
  try {
    await jwt.verify(req.cookies.access_token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        res.cookie('prev_page', req.originalUrl);

        return res.status(401).json({ error: '투표 권한이 없습니다' });
      }

      if (!req.user) {
        res.locals.user = await User.findById(decoded.id);
        req.user = res.locals.user._id;
      }

      next();
    });
  } catch (err) {
    res.status(500).json({ error: 500 });
  }
};
