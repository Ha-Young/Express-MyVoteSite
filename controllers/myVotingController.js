const User = require("../models/User");
const { format } = require("date-fns");

exports.getMyVotings = async function(req, res, next) {
  try {
    const { user } = req;
    const displayName = user ? user.userName : null;

    await User.findById(user._id).populate("votingsCreatedByMe").exec((err, votings) => {
      if (err) {
        next(err);
        return;
      }

      const myVotings = votings.votingsCreatedByMe;
      res.render(
        "myVotings",
        { title: "My Votings",
          format: format,
          displayName,
          myVotings,
        }
      );
    });
  } catch (error) {
    next(err);
  }
};
