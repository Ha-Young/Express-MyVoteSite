exports.getMain = (req, res, next) => {
  console.log('main!!!');
  res.render('main', { user: req.user });
};
