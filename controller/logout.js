const getMainPage = (req, res, next) => {
  res.redirect('/');
};

module.exports = {
  getMainPage,
};
