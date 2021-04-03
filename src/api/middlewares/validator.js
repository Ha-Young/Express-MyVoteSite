const createError = require("http-errors");
const User = require("../../models/User");
const Voting = require("../../models/Voting");

exports.validatePostSignUp = async (req, res, next) => {
  try {
    const { email, password1, password2 } = req.body;
    const isExistEmail = await User.exists({ email });

    if (email.trim().length < 3 || !password1.trim() || !password2.trim()) {
      req.flash("error", "공백은 입력할 수 없습니다.");
      res.redirect("/auth/signup");
      return;
    }

    if (!email.match(/^([\w-]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
      req.flash("error", "잘못된 이메일 주소입니다.");
      res.redirect("/auth/signup");
      return;
    }

    if (isExistEmail) {
      req.flash("error", "존재하는 이메일입니다.");
      res.redirect("/auth/signup");
      return;
    }

    if (password1 !== password2) {
      req.flash("error", "비밀번호가 다릅니다.");
      res.redirect("/auth/signup");
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    next(createError(500));
  }
};

exports.validatePutVoting = async (req, res, next) => {
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
