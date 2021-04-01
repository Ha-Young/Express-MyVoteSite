const createError = require("http-errors");
const User = require("../../models/User");
const Voting = require("../../models/Voting");

exports.validatePostSignUp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isExistEmail = await User.exists({ email });

    if (isExistEmail) {
      console.log("exist email!");
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
  const selection = Object.keys(req.body);

  if (!req.user) {
    res.redirect(`/auth/login?votings=${votingId}`);
    return;
  }

  if (selection.length !== 1) {
    console.log("Choose one option!");
    res.redirect(`/votings/${votingId}`);
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
      console.log("Voting end!");
      res.redirect(`/votings/${votingId}`);
      return;
    }

    if (voting.participants.indexOf(userId) !== -1) {
      console.log("Can't vote the same twice!");
      res.redirect(`/votings/${votingId}`);
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    next(createError(500));
  }
};
