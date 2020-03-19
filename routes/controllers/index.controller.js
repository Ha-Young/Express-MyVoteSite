const getPollsAndTimeString = require('../../lib/getPollsAndTimeString');
const createError = require('http-errors');

exports.renderIndex = async (req, res, next) => {
  try {
    const data = await getPollsAndTimeString();
    const { polls } = data;
    const { timeString } = data;
    if (req.isAuthenticated()) {
      res.render('index', { hasLoggedIn: true, polls, timeString });
    } else {
      res.render('index', { hasLoggedIn: false, polls, timeString });
    }
  } catch(e) {
    next(createError(500, "Internal Error, Please try again"));
  }
};
