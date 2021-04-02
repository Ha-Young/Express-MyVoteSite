async function voteInputValidation(req, res, next) {
  try {
    console.log(req.body,"111111")
    const { title, expireDate, options } = req.body;

    const errorMessages = [];

    if (!title.length || !expireDate || !options.length) {
      errorMessages.push({ message: "Please fill out all fields"});
    }

    const today = new Date();
    const votingDueDate = new Date(expireDate);
    const isProceeding = today < votingDueDate;

    const isOptionsValidated = options && options.every(option => option.trim().length > 0);

    if (!isOptionsValidated) {
      errorMessages.push({message: "Should contain at least 2 options with proper letter"});
    }

    if (!isProceeding) {
      errorMessages.push({message: "The expire date can't be eariler than today"});
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
