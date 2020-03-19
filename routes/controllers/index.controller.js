const getPollsAndTimeString = require('../../lib/getPollsAndTimeString');
const createError = require('http-errors');

module.exports = async (req, res, next) => {
  const data = await getPollsAndTimeString();
  const { polls } = data;
  const { timeString } = data;
  if (req.isAuthenticated()) {
    res.render('index', { hasLoggedIn: true, polls, timeString });
  } else {
    res.render('index', { hasLoggedIn: false, polls, timeString });
  }
};
