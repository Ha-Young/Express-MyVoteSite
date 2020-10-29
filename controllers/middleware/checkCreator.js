const User = require('../../models/usersModel');

module.exports = async (req, res, next) => {
  // console.log('/:id route 2nd middleware checkCreator');

  const voting = req.body.voting;
  const userId = req.session.user_id;
  if (voting.creator === userId) {
    req.body.isCreator = true;
  }
  next();
};
