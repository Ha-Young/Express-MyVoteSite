const User = require("../models/User");
const { format } = require("date-fns");

exports.getMyVotings = async function(req, res, next) {
  const { user } = req;
  const displayName = user ? user.userName : null;

  await User.findById(user._id).populate("votingsCreatedByMe").exec((err, votings) => {
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
};
