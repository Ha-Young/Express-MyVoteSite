const User = require('../../models/User');
const { MESSAGE } = require('../../constants/views');

async function checkIsEmailRegistered(req, res, next) {
  const { email } = req.body;
  const emailSearchResult = await User.findOne({ email });

  if (emailSearchResult) {
    res.status(302).render(MESSAGE, { message: ALREADY_REGISTERED });

    return;
  }

  next();
};

module.exports = checkIsEmailRegistered;
