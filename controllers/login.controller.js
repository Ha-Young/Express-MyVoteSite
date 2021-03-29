const User = require("../models/User");

module.exports.get = async (req, res, next) => {
  res.status(200).render("login");
};

module.exports.post = async (req, res, next) => {
  const user = req.body;
  console.log(user);

  res.status(201).json({ result: true });


}
