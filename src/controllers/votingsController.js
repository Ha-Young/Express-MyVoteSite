const createError = require("http-errors");
const Voting = require("../models/Voting");
const { getVotingResult } = require("../utils/getVotingResult");

exports.getVoting = async (req, res, next) => {
  const { id } = req.params;
  const errorMessage = req.flash("error");

  try {
    const voting = await Voting.findById(id);

    const votingResult = getVotingResult(voting.options);
    const renderOption = {
      pageTitle: voting.title,
      voting,
      votingResult,
      errorMessage,
    };

    res.render("votingDetail", renderOption);
  } catch (err) {
    console.log(`Can't find voting by ${id}!`, err);
    next(createError(404));
  }
};

exports.putVoting = async (req, res, next) => {
  const userId = req.user.id;
  const votingId = req.params.id;
  const selection = Object.keys(req.body)[0];

  try {
    await Voting.findOneAndUpdate(
      {
        _id: votingId,
        "options._id": selection,
      },
      { $push:
        {
          participants: [userId],
          "options.$.selector": [userId],
        },
      }
    );

    res.redirect("/");
  } catch (err) {
    console.log("Failed put voting", err);

    next(createError(500));
  }
};

exports.getNewVoting = (req, res) => {
  const renderOption = { pageTitle: "New Voting" };

  res.render("newVoting", renderOption);
};

exports.postNewVoting = async (req, res) => {
  const { title, expiration, option } = req.body;
  const { id, username } = req.user;

  const timeStamp = new Date(expiration);
  const options = option.map(item => ({
    title: item,
    count: 0,
  }));

  const votingInfo = {
    title,
    options,
    expiration: timeStamp,
    postedBy: {
      id,
      username,
    },
  };

  try {
    await Voting.create(votingInfo);

    res.redirect("/votings/success");
  } catch (err) {
    console.log("Failed post new voting!", err);

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
