const Vote = require("../model/Vote");
const User = require("../model/User");

const datefns = require("date-fns");

module.exports.main = async function main(req, res, next) {
  const {
    user
  } = req;

  const votes = await Vote.find({}).lean();
  votes.forEach(vote => {
    vote.createAt = datefns.format(vote.createAt, "yyyy/M/d h:m:s");
    vote.dueDate = datefns.format(vote.dueDate, "yyyy/M/d h:m:s");
    vote.isCreator = user && String(vote.creator) === String(user._id);
  });

  res.render("main", { user, votes });
}
