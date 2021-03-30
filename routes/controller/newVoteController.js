const User = require("../../models/User");
const Voting = require("../../models/Voting");
const createError = require("http-errors");
const errorMessage = require("../../constants/errorMessage");

exports.renderNewVotePage = function (req, res, next) {
  res.status(200).render("newVote", { messages: req.flash("createVoteError") });
};

exports.createVote = async function (req, res, next) {
  console.log("is that logged user?", req.user);
  console.log("is that voting want?", req.body);
  const user = await User.findOne({ email: req.user.email });
  const { voteName, expireDate, creator, options } = req.body;

  const voteOptions = options.filter(Boolean).map((option) => {
    return { name: option, voteCount: 0 };
  });

  console.log("user is", user);

  console.log("voteOption is...", voteOptions);

  try {
    const voting = new Voting({
      name: voteName,
      expireDate: expireDate,
      createdBy: {
        refid: user._id,
        name: creator,
      },
      voters: [],
      options: voteOptions,
    });

    await voting.save();
    return res.status(200).redirect("/votings/new");
  } catch (error) {
    console.log(error);
    next(createError(500, errorMessage.SERVER_ERROR));
  }

  res.status(200).render("newVote", { messages: [] });
};
