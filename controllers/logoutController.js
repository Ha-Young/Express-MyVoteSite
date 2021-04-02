exports.getLogOut = async function(req, res, next) {
  try {
    req.session.destroy();
    res.redirect("/");
    return;
  } catch (error) {
    next(error);
  }
};
