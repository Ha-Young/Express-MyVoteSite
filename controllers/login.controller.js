exports.getLoginPage = async function (req, res, next) {
  const userInput = req.flash('userInput')[0] || {};
  const errors = req.flash('errors')[0] || {};

  res.render('login', { userInput, errors });
};
