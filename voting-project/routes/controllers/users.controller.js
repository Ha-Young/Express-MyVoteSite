const user = require("../../models/user");
const bcrypt = require("bcrypt");

exports.getAll = async function(req, res, next) {
  var fmsg = req.flash();
  var feedback = "";
  if (fmsg.error) {
    feedback = fmsg.error[0];
  }
  res.render("register", { error: feedback });
};

exports.create = async function(req, res, next) {
  if (req.body.password !== req.body.password2) {
    req.flash("error", "Password must same!");
    res.render("register", { error: req.flash("error") });
  } else {
    const hash = await bcrypt.hash(req.body.password, 10);
    await user.create({
      email: req.body.email,
      name: req.body.name,
      password: hash
    });
    return res.redirect("/login");
  }
};
