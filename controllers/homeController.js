exports.getHomePage = async function(req, res, next) {
   console.log(req.user,"hummmm")

  const displayName = req.user ? req.user.userName : null;

  console.log(displayName, "display!??~?~~?~?")

   res.render("index", { title: 'Home', displayName, error: req.flash("error") });
}
