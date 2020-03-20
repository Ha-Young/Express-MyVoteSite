const createError = require('http-errors');
const User = require('../../models/user');
const Poll = require('../../models/poll');
const getPollsAndTimeString = require('../../lib/getPollsAndTimeString');

exports.displayMyVotings = async(req, res, next) => {
  try {
    const id = req.session.passport.user;
    const user = await User.findById(id);
    if (!user.myPolls.length) {
      return res.render('myvotings', { 
        hasLoggedIn: true, 
        polls: null, 
        timeString: null,
      });
    }
  
    const criteria = { $or: [] };
    user.myPolls.forEach((id) => {
      const obj = {};
      obj._id = id;
      criteria.$or.push(obj);
    });
    const myPolls = await Poll.find(criteria).populate('creator');
    const data = await getPollsAndTimeString(myPolls);
    const { polls } = data;
    const { timeString } = data;
    res.render('myvotings', { hasLoggedIn: true, polls, timeString });
  } catch (e) {
    next(createError(500, "Internal Error, Please try again"));
  }
};
