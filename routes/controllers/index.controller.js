const createError = require('http-errors');
const getPollsAndTimeString = require('../../lib/getPollsAndTimeString');

exports.renderIndex = async (req, res, next) => {
  try {
    console.log(33333333)
    const data = await getPollsAndTimeString();
  
    const { polls } = data;
    const { timeString } = data;
    if (req.isAuthenticated()) {
      res.render('index', { hasLoggedIn: true, polls, timeString });
    } else {
      console.log(444444)
      res.render('index', { hasLoggedIn: false, polls, timeString });
    }
  } catch(e) {
    next(createError(500, "Internal Error, Please try again"));
  }
};
