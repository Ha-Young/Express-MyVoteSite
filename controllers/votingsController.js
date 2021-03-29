exports.getVoting = (req, res) => {
  res.render("votingDetail", { pageTitle: "Voting" });
};
exports.postVoting = (req, res) => {
};

exports.getNewVoting = (req, res) => {
  res.render("newVoting", { pageTitle: "New Voting" });
};
exports.postNewVoting = (req, res) => {
};

exports.votingSuccess = (req, res) => {
  res.render("votingSuccess", { pageTitle: "Voting Success" });
};
exports.votingFail = (req, res) => {
  res.render("votingError", { pageTitle: "Voting Error" });
};
