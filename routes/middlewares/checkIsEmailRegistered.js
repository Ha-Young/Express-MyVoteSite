const User = require('../../models/User');

async function checkIsEmailRegistered(req, res, next) {
  const { email } = req.body;
  const emailSearchResult = await User.findOne({ email });

  if (emailSearchResult) {
    res.status(302).render('message', { message: '이미 가입한 이메일입니다' });

    return;
  }

  next();
};

module.exports = checkIsEmailRegistered;
