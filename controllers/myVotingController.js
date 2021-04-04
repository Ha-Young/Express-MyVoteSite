const User = require("../models/User");
const { format } = require("date-fns");
const { getDisplayName, getFormattedExpireDate } = require("../utils/votingHelpers");

exports.getMyVotings = async function(req, res, next) {
  try {
    const { user } = req;
    const displayName = getDisplayName(user);
    const myVotings = await User.findById(user._id).populate("votingsCreatedByMe").lean();
    const votingsCreatedByMe = myVotings.votingsCreatedByMe;

    const myVotingFormat = votingsCreatedByMe.map(voting => {
      const {
        _id,
        title,
        isProceeding,
        expireDate
      } = voting;

      return {
        _id,
        title,
        isProceeding,
        expireDate: getFormattedExpireDate(expireDate)
      }
    });

    res.render(
      "myVotings",
      { title: "My Votings",
        displayName,
        myVotingFormat,
      }
    );
  } catch (err) {
    next(err);
  }
};
