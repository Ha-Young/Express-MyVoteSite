const User = require('../../models/user');
const Poll = require('../../models/poll');
const getPollsAndTimeString = require('../../lib/getPollsAndTimeString');

module.exports = async (req, res, next) => {
  try {
    const id = req.session.passport.user;
    const user = await User.findById(id);
    if (!user.myPolls.length) {
      return res.render('myvotings', { hasLoggedIn: true, polls: null, timeString: null });
    }
  
    const crriteria = { $or: []};
    user.myPolls.forEach((id) => {
      const obj = {};
      obj._id = id;
      crriteria.$or.push(obj);
    });
  
    const myPolls = await Poll.find(crriteria);
    // const myPolls = await Poll.find(crriteria).populate('creator');
    const data = await getPollsAndTimeString(myPolls);
    const { polls } = data;
    const { timeString } = data;
    res.render('myvotings', { hasLoggedIn: true, polls, timeString });
  } catch(e) {
    throw(createError(500, "Internal Error, Please try again"));
  }
};
