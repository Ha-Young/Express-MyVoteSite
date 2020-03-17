const User = require('../models/User');

async function findUser(req) {
  const userId = req.user;
  const user = await User.findById(userId);

  return user;
}

module.exports = {
  findUser
};
