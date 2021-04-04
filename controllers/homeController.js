const Voting = require("../models/Voting");
const { getDisplayName, getFormattedExpireDate } = require("../utils/votingHelpers");

exports.getVotings = async function(req, res, next) {
  try {
    const { user } = req;
    const displayName = getDisplayName(user);
    const today = new Date();

    await Voting.updateMany(
      { expireDate: { $lte: today }},
      { $set: { isProceeding: false }}
    );
    const votings = await Voting.find().populate("author").lean();

    const votingFormat = votings.map(voting => {
      const {
        _id,
        title,
        isProceeding,
        expireDate,
        author
      } = voting;

      return {
        _id,
        title,
        author,
        isProceeding,
        expireDate: getFormattedExpireDate(expireDate)
      }
    })

    res.render(
      "index",
      { title: "Home",
        displayName,
        votingFormat,
      }
    );
  } catch (err) {
    next(err);
  }
};
