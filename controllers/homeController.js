const Voting = require("../models/Voting");

exports.getVotings = async function(req, res, next) {
  try {
    const { user } = req;
    const displayName = user ? user.userName : null;

    const today = new Date();

    await Voting.updateMany(
      { expireDate: { $lte: today }},
      { $set: { isProceeding: false }}
    );

    const votings = await Voting.find().populate("author").lean();

    res.render(
      "index",
      { title: "Home",
        displayName,
        votings,
        error: req.flash("error")
      }
    );
  } catch (error) {
    next(error);
  }
};
