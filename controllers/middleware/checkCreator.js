const User = require('../../models/usersModel');

module.exports = async (req, res, next) => {
  const voting = req.body.voting;
  const userId = req.session.user_id;
  if (voting.creator === userId) {
    req.body.isCreator = true;
  }
  next();
};
