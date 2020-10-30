const User = require('../../models/User');
const { GET, POST, PUT } = require('../../constants/methods');
const { LOGIN } = require('../../constants');

async function gateKeeper(req, res, next) {
  const { userId } = req.session;
  const dbSearchResult = await User.findById(userId);

  if (!req.isAuthenticated() || !dbSearchResult) {
    if (req.method === GET || req.method === POST) {
      res.status(302).redirect('/login');

      return;
    } else if (req.method === PUT) {
      res.json({
        result: LOGIN,
        message: LOGIN,
      });

      return;
    }
  }

  next();
}

module.exports = gateKeeper;
