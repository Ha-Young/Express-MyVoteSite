const Voting = require("../models/Voting");
const { format } = require("date-fns");

exports.getVotings = async function(req, res, next) {
  try {
    const { user } = req;
    const displayName = user ? user.userName : null;
    const today = new Date();

    await Voting.updateMany(
      { expireDate: { $lte: today }},
      { $set: { isProceeding: false }}
    );

    await Voting.find().populate("author").exec((err, votings) => {
      if (err) {
        next(err);
        return;
      }

      res.render(
        "index",
        { title: "Home",
          format: format,
          displayName,
          votings,
          error: req.flash("error")
        }
      );
    });
  } catch (error) {
    next(error);
  }
};
