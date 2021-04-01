const User = require("../../models/User");
const Voting = require("../../models/Voting");
const createError = require("http-errors");
const errorMessage = require("../../constants/errorMessage");

exports.renderNewVotePage = function (req, res, next) {
  // console.log("looking for", req.user);
  // console.log("cookie", req.cookies["jwt"]);

  res.status(200).render("newVote", { messages: req.flash("createVoteError") });
};

exports.createVote = async function (req, res, next) {
  const userId = req.user._id;
  const user = await User.findById(userId);
  const { voteName, expireDate, creator, options } = req.body;

  const voteOptions = options.filter(Boolean).map((option) => {
    return { name: option, voteCount: 0 };
  });

  try {
    const voting = new Voting({
      name: voteName,
      nickname: creator,
      expireDate: expireDate,
      createdBy: userId,
      voters: [],
      options: voteOptions,
    });

    console.log(voting);

    //수정 필요...
    await voting.save(async (err, voting) => {
      await user.votings.push(voting._id);
      await user.save();
    });

    return res.status(200).redirect("/votings");
  } catch (error) {
    console.log(error);
    next(createError(500, errorMessage.SERVER_ERROR));
  }
};
