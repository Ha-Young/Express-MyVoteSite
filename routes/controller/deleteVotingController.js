const Voting = require("../../models/Voting");

exports.deleteVoting = async function (req, res, next) {
  console.log(req.params.id);
  const votingId = req.params.id;
  await Voting.findByIdAndDelete(votingId);

  res.status(200).json({ message: "success" });
};
