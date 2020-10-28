const User = require('../../models/User');

async function gateKeeper(req, res, next) {
  const { userId } = req.session;
  const dbSearchResult = await User.findById(userId);

  if (!req.isAuthenticated() || !dbSearchResult) {
    if (req.method === 'GET' || req.method === 'POST') {
      res.status(302).redirect('/login');

      return;
    } else if (req.method === 'PUT') {
      res.json({
        result: 'redirct',
        message: '로그인 하세요',
      });

      return;
    }
  }

  next();
}

module.exports = gateKeeper;
