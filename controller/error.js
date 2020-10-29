const getErrorPage = async (req, res, next) => {
  res.render('error');
};

module.exports = {
  getErrorPage,
};
