const User = require("../../models/User");
const createError = require("http-errors")

exports.signUp = async(req, res, next) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  try {
    await user.save();
    res.status(201).render("success", { message: "WELCOME TO VOTING FLATFORM"});
  } catch (err) {
    console.log(err);
    next(createError(500, "Internal Server Error"));
  }
};
