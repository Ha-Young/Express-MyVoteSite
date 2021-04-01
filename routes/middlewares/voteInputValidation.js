const { format } = require('date-fns');

async function voteInputValidation (req, res, next) {
  try {
    const { title, expireDate, votingOptions } = req.body;

    const errorMessages = [];

    // const today = format(new Date, "yyyy-MM-dd\'T\'HH:mm");

    if (!title.length || !expireDate || !votingOptions.length) {
      errorMessages.push({ message: "Please fill out all fields"});
    }

    const today = new Date();
    const votingDueDate = new Date(expireDate)
    const isProceeding = today < votingDueDate;

    const isOptionsValidated = votingOptions.every(option => option.trim().length > 0);

    if (!isOptionsValidated) {
        errorMessages.push({message: "Should contain at least 2 options with proper letter"})
      //req.flash('message', "Should contain at least 2 options with proper letter");
      //res.redirect("/votings/new");
      //return;
    }

    if (!isProceeding) {
      errorMessages.push({message: "The due date can't be eariler than today"});
    }

    if (errorMessages.length) {
      errorMessages.forEach(errorMessage => {
        req.flash('messages', errorMessage);
      });
      res.redirect("/votings/new");
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = voteInputValidation;
