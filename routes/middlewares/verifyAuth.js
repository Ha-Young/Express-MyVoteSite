function verifyAuth(req, res, next) {
    if (req.isAuthenticated()) {
      // res.redirect(req.session.returnTo)
      next();
      return;
    }

    res.redirect("/login")
    // console.log(req.originalUrl, req.method, "session")

    // req.session.returnTo = req.originalUrl;
    // res.redirect("/login");
    // req.session.save(function (err) {
    //     if (err) return next(err);
    //     console.log(111111111)
    //     console.log(req.session)

    //     res.redirect("/login");
    //     return;
    // });

    // console.log("failed?")
    // res.redirect("/login");
}

module.exports = verifyAuth;
