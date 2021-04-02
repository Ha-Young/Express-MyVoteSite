async function votingSubmitValidation(req, res, next) {
  try {
    const { votingId, selectedOptionValue, selectedOptionId } = req.body;

    if (!votingId || !selectedOptionId || !selectedOptionValue) {
      req.flash("messages", "should choose at least one option for voting");
      res.redirect("/votings/:id")
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = votingSubmitValidation;