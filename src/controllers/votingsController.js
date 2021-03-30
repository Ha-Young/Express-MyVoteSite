const createError = require("http-errors");
const { NotExtended } = require("http-errors");
const User = require("../models/User");
const Voting = require("../models/Voting");

exports.getVoting = (req, res) => {
  res.render("votingDetail", { pageTitle: "Voting" });
};
exports.postVoting = (req, res) => {
};

exports.getNewVoting = (req, res) => {
  res.render("newVoting", { pageTitle: "New Voting" });
};
exports.postNewVoting = async (req, res, next) => {
  console.log(req.body, req.user.id);
  const { title, expiration, option } = req.body;
  const { votings, id } = req.user;

  const timeStamp = new Date(expiration.join(" "));
  const options = option.map(item => ({
    title: item,
    count: 0,
  }));

  try {
    const newVoting = await Voting.create({
      title,
      expiration: timeStamp,
      options,
      postedBy: id,
    });

    const postedUser = await User.findById(id);

    postedUser.votings.push(newVoting.id);
    postedUser.save();

    res.redirect("/");
  } catch (err) {
    console.log(err);
    next(createError(500));
  }
};

exports.votingSuccess = (req, res) => {
  res.render("votingSuccess", { pageTitle: "Voting Success" });
};
exports.votingFail = (req, res) => {
  res.render("votingError", { pageTitle: "Voting Error" });
};
