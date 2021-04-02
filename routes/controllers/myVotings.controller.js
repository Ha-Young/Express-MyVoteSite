const createError = require("http-errors");

const User = require("../../model/User");
const Vote = require("../../model/Vote");

exports.getMyVotings = async (req, res, next) => {
  try {
    const userId = req.session.userId;

    const userDoc = await User
      .findById(userId)
      .populate({
        path: "votings",
        populate: {
          path: "voteId",
        }
      })
      .lean();

    const renderProps = {
      userName: userDoc.user_name,
      creatingVotes: [],
      participatingVotes: [],
    };

    for (const vote of userDoc.votings) {
      if (vote.isCreator) {
        renderProps.creatingVotes.push({
          id: vote.voteId._id.toString(),
          title: vote.voteId.title,
        });
      }

      if (vote.optionId) {
        const voteDoc = await Vote
          .findById(vote.voteId, ["options"])
          .lean();
        const option = voteDoc.options.find(
          option => option._id.toString() === vote.optionId.toString()
        );

        renderProps.participatingVotes.push({
          id: vote.voteId._id.toString(),
          title: vote.voteId.title,
          optionContent: option.title,
        });
      }
    }

    return res.render("myVotings", renderProps);
  } catch (error) {
    console.error(error);

    return next(createError(500, error));
  }
};
