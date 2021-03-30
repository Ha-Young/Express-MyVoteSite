exports.getMain = (req, res, next) => {
  console.log('main!!!');
  res.render('main', { username: req.user.username });
};
