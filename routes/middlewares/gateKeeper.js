const User = require('../../models/User');
const { GET, POST, PUT } = require('../../constants/methods');
const { REDIRECT_LOGIN } = require('../../constants');
const { LOGIN } = require('../../constants/urls');
const { LOGIN_PLEASE } = require('../../constants/messages');
const tryCatchWrapper = require('../../utils/tryCatchWrapper');

const gateKeeper = tryCatchWrapper(async (req, res, next) => {
  const { userId } = req.session;
  const dbSearchResult = await User.findById(userId);

  if (!req.isAuthenticated() || !dbSearchResult) {
    if (req.method === GET || req.method === POST) {
      res.status(302).redirect(LOGIN);

      return;
    } else if (req.method === PUT) {
      res.json({
        result: REDIRECT_LOGIN,
        message: LOGIN_PLEASE,
      });

      return;
    }
  }

  next();
});

module.exports = gateKeeper;
