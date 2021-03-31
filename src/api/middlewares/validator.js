const createError = require("http-errors");
const User = require("../../models/User");
const Voting = require("../../models/Voting");
const { checkPassword, checkExpiration } = require("../../utils/validates")

exports.validatePostSignUp = async (req, res, next) => {
  try {
    const { email, password1, password2 } = req.body;
    const isExistEmail = await User.exists({ email });

    if (isExistEmail) {
      console.log("exist email!");
      res.redirect("/auth/signup");
      return;
    }

    if (!checkPassword(password1, password2)) {
      console.log("two password should be equal!");
      res.redirect("/auth/signup");
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    next(createError(500));
  }
};

exports.validatePostNewVoting = (req, res, next) => {
  const { expiration } = req.body;
  const timeStamp = new Date(expiration.join(" "));

  if (!checkExpiration(timeStamp)) {
    console.log("The expiration date cannot be older than the present!");
    res.redirect("/votings/new");
    return;
  }

  next();
};

exports.validatePostVoting = async (req, res, next) => {
  try {
    const votingId = req.params.id;
    const userId = req.user.id;
    const selection = Object.keys(req.body);

    const voting = await Voting.findById(votingId);

    if (!voting) {
      console.log("Failed finding voting!");
      next(createError(500));
      return;
    }

    if (!voting.process) {
      console.log("Voting end!");
      res.redirect(`/votings/${votingId}`);
      return;
    }

    if (voting.paticipants.indexOf(userId) !== -1) {
      console.log("Can't vote the same twice!");
      res.redirect(`/votings/${votingId}`);
      return;
    }

    if (selection.length !== 1) {
      console.log("Choose one option!");
      res.redirect(`/votings/${votingId}`);
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    next(createError(500));
  }
};
