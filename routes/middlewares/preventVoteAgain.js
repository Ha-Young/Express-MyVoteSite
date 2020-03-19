const Poll = require('../../models/poll');

module.exports = async (req, res, next) => {
  const { user }  = req.session.passport;
  const pollId = req.params.poll_id;
  const poll = await Poll.findById(pollId);
  const hasSolved = poll.finishedUsers.some((id) => {
    if (id === user) return true;
  });
   console.log(hasSolved);
 
  if (!hasSolved) {
    res.locals = { poll }
    return next();
  }
  res.redirect('/');
};
