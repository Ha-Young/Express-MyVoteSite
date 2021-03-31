const Vote = require("../model/Vote");
const User = require("../model/User");

const datefns = require("date-fns");

module.exports.main = async function main(req, res, next) {
  const {
    user
  } = req;

  console.log("current User : ", req.user);

  // Vote들 가져오기
  const votes = await Vote.find({}).lean();
  votes.forEach(vote => {
    vote.createAt = datefns.format(vote.createAt, "yyyy/M/d h:m:s");
    vote.dueDate = datefns.format(vote.dueDate, "yyyy/M/d h:m:s");
  });
  console.log(user);

  res.render("main", { user, votes });
}
