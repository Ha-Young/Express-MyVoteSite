function checkUserExist(req, res, next) {
    console.log(req.user, "??");
    if (req.isAuthenticated()) {
      // res.redirect(req.session.returnTo)
    //   res.json("user exist")
    next();
      return;
    }
    res.json("no user")
}

module.exports = checkUserExist;