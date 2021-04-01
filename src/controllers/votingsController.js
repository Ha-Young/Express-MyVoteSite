const createError = require("http-errors");
const Voting = require("../models/Voting");
const { getVotingResult } = require("../utils/getVotingResult");

exports.getVoting = async (req, res, next) => {
  const { id } = req.params;
  const errorMessage = req.flash("error");

  try {
    const voting = await Voting.findById(id);

    if (!voting) {
      console.log(`Can't find voting by ${id}!`);
      next(createError(404));
    }

    const votingResult = getVotingResult(voting.options);

    res.render("votingDetail", {
      pageTitle: voting.title,
      voting,
      votingResult,
      errorMessage,
    });
  } catch (err) {
    console.log(err);
    next(createError(500));
  }
};
exports.postVoting = async (req, res, next) => {
  const userId = req.user.id;
  const votingId = req.params.id;
  const selection = Object.keys(req.body)[0];

  try {
    await Voting.findOneAndUpdate(
      { _id: votingId, "options._id": selection },
      { $push:
        { participants: [userId], "options.$.selector": [userId] }
      }
    );

    res.redirect("/");
  } catch (err) {
    console.log(err);
    next(createError(500));
  }
};

exports.getNewVoting = (req, res) => {
  res.render("newVoting", { pageTitle: "New Voting" });
};
exports.postNewVoting = async (req, res, next) => {
  const { title, expiration, option } = req.body;
  const { id, username } = req.user;

  const timeStamp = new Date(expiration);
  const options = option.map(item => ({
    title: item,
    count: 0,
  }));

  try {
    await Voting.create({
      title,
      expiration: timeStamp,
      options,
      postedBy: {
        id,
        username,
      },
    });

    res.redirect("/votings/success");
  } catch (err) {
    console.log(err);
    res.redirect("/votings/error");
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
