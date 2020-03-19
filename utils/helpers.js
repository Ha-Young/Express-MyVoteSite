const User = require('../models/User');

async function findUser(req) {
  const userId = req.user;
  const user = await User.findById(userId);

  return user;
}

function checkSameUser(user, votingUserId) {
  if (user) {
    if (String(votingUserId) === String(user._id)) {
      return true;
    }
  }

  return false;
}

module.exports = {
  findUser,
  checkSameUser
};
