exports.getMain = (req, res, next) => {
  const sess = req.session;
  res.render('main', {
    username: sess.username,
  });
};
