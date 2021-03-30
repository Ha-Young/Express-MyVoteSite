const Vote = require("../model/Vote");
const User = require("../model/User");

module.exports.main = async function main(req, res, next) {
  const {
    user
  } = req;

  console.log(req.user);

  // Vote들 가져오기
  const votes = await Vote.find({}).lean();
  console.log(user);

  res.render("main", { user, votes });
}
