const createError = require("http-errors");
const User = require("../models/User");
const Voting = require("../models/Voting");

exports.getVoting = async (req, res, next) => {
  const { id } = req.params;
  const voting = await Voting.findById(id);

  res.render("votingDetail", { pageTitle: voting.title, voting });
};
exports.postVoting = (req, res) => {
};

exports.getNewVoting = (req, res) => {
  res.render("newVoting", { pageTitle: "New Voting" });
};
exports.postNewVoting = async (req, res, next) => {
  const { title, expiration, option } = req.body;
  const { id } = req.user;

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

exports.deleteVoting = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Voting.findByIdAndDelete(id);

    res.redirect("/");
  } catch (err) {
    console.log(err);
    next(createError(500));
  }
};
