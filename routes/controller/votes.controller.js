const Voting = require("../../models/Voting");
const User = require("../../models/User");

exports.getAllVotings = async function (req, res, next) {
  const allVotings = await Voting.find();

  res.render("index", { allVotings: allVotings });
}

exports.showVoteDetails = async function (req, res, next) {
  const id = req.params.vote_id;
  const vote = await Voting.findById(id);
  const creator = await User.findById(vote.creator);

  res.render("votingDetail", {
    id: vote._id,
    title: vote.title,
    due_date: vote.due_date,
    candidates: vote.candidates,
    creator: creator
  });
}

exports.addOneToSelectedOption = async function (req, res, next) {
  const votingId = req.params.vote_id;
  const selectedOptionName = req.body.name;

  const options = await Voting.findById(votingId).select("candidates");
  const candidates = options.candidates;

  for (let i = 0; i < candidates.length; i++) {
    if (candidates[i].name === selectedOptionName) {
      candidates[i].count++;
      break;
    }
  }

  await Voting.updateOne({ _id: votingId }, {
    candidates: candidates,
  });
}
