const User = require('../../models/User');

async function gateKeeper(req, res, next) {
  const { userId } = req.session;
  const dbSearchResult = await User.findById(userId);

  if (!userId || !dbSearchResult) {
    res.status(302).redirect('/login');

    return;
  }

  next();
}

module.exports = gateKeeper;
