const createError = require("http-errors");
const User = require("../../models/User");
const Voting = require("../../models/Voting");

exports.validatePostSignUp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isExistEmail = await User.exists({ email });

    if (isExistEmail) {
      req.flash("error", "존재하는 이메일입니다.");
      res.redirect("/auth/signup");
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    next(createError(500));
  }
};

exports.validatePostVoting = async (req, res, next) => {
  const votingId = req.params.id;

  if (!req.user) {
    res.redirect(`/auth/login?votings=${votingId}`);
    return;
  }

  try {
    const userId = req.user.id;
    const voting = await Voting.findById(votingId);

    if (!voting) {
      console.log("Failed finding voting!");
      next(createError(500));
      return;
    }

    if (!voting.progress) {
      req.flash("error", "종료된 투표입니다.");
      res.redirect(`/votings/${votingId}`);
      return;
    }

    if (voting.participants.indexOf(userId) !== -1) {
      req.flash("error", "같은 투표에 두 번 이상 참여할 수 없습니다.");
      res.redirect(`/votings/${votingId}`);
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    next(createError(500));
  }
};
