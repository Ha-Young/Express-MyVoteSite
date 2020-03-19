const User = require('../../models/user');
const Poll = require('../../models/poll');
const getPollsAndTimeString = require('../../lib/getPollsAndTimeString');

module.exports = async (req, res, next) => {
  const id = req.session.passport.user;
  
  const user = await User.findById(id);
  // const asdf = user.myPolls.populate('creator');
  // const data = getPollsAndTimeString(user.myPolls);
  const crriteria = { $or: []};
  user.myPolls.forEach((id) => {
    const obj = {};
    obj._id = id;
    crriteria.$or.push(obj);
  });

  console.log(crriteria);
  const ff = await Poll.find(crriteria).populate('creator')
  console.log(ff);
  res.render('/')
};