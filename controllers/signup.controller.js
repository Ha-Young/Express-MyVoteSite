exports.getSignupPage = function (req, res) {
  const userInput = req.flash('userInput')[0] || {};
  const errors = req.flash('errors')[0] || {};

  res.render('signup', { userInput, errors });
};
