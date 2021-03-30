exports.getLogOut = async function(req, res, next) {
    // console.log(req.flash("error"), "??")
  try {
    req.session.destroy();
    req.logout();
    res.redirect("/");
  } catch (error) {
    next(error);
  }
}
