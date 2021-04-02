function verifyUser(req, res, next) {
    if (req.isAuthenticated()) {

      
      res.redirect("/")
      return;
    }
    console.log("nexT?")
    next();
}

module.exports = verifyUser;
