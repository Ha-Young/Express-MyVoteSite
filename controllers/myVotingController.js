const User = require("../models/User");
const { format } = require("date-fns");
const { getDisplayName } = require("../utils/votingHelpers");

exports.getMyVotings = async function(req, res, next) {
  try {
    const { user } = req;
    const displayName = getDisplayName(user);

    await User.findById(user._id).populate("votingsCreatedByMe").exec((err, votings) => {
      if (err) {
        next(err);
        return;
      }

      const myVotings = votings.votingsCreatedByMe;
      res.render(
        "myVotings",
        { title: "My Votings",
          format,
          displayName,
          myVotings,
        }
      );
    });
  } catch (err) {
    next(err);
  }
};
