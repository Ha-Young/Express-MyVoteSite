const { checkExpireDate } = require("../../../utils/votingHelpers");

async function newVotingInputValidation(req, res, next) {
  try {
    const newVotingMessages = [];
    const { title, expireDate, options } = req.body;

    if (!title.length || !expireDate || !options.length) {
      newVotingMessages.push({ newVotingMessage: "Please fill out all fields" });
    }

    const isProceeding = checkExpireDate(expireDate);
    const isOptionsValidated = options && options.every(option => option.trim().length > 0);

    if (!isOptionsValidated) {
      newVotingMessages.push({ newVotingMessage: "Should contain at least 2 options with proper letter" });
    }

    if (!isProceeding) {
      newVotingMessages.push({ newVotingMessage: "The expire date can't be eariler than today" });
    }

    if (newVotingMessages.length) {
      newVotingMessages.forEach(newVotingMessage => {
        req.flash("newVotingMessages", newVotingMessage);
      });

      res.redirect("/votings/new");
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = newVotingInputValidation;
