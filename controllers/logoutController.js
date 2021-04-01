exports.getLogOut = async function(req, res, next) {
  try {
    req.session.destroy();
    req.logout();
    res.redirect("/");
    return;
  } catch (error) {
    next(error);
  }
};
