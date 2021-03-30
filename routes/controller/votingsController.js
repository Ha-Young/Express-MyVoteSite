exports.renderVotingsPage = function (req, res, next) {
  console.log("requested user in votings controller", req.user);
  res.status(200).render("votings");
};
