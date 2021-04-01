const Voting = require("../../models/Voting");
const User = require("../../models/User");

exports.getAllVotings = async function (req, res, next) {
  const allVotings = await Voting.find();

  res.render("index", { allVotings: allVotings });
}

exports.showMyVotings = async function (req, res, next) {
  const userId = req.session.passport.user;
  let myVotingsIdList = await User.findById(userId).select("created_votings");

  myVotingsIdList = myVotingsIdList.created_votings;

  const myVotings = await Voting.find({
    _id: { $in: myVotingsIdList }
  });

  res.render("myVotings", { myVotings: myVotings });
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
  const userId = req.session.passport.user;
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

  await User.updateOne(
    { _id: userId },
    { $push: { participated_votings: votingId } }
  );

  await Voting.updateOne({ _id: votingId }, {
    candidates: candidates,
  });
}

exports.deleteVoting = async function (req, res, next) {
  const userId = req.session.passport.user;
  const votingId = req.params.vote_id;

  // await User.deleteOne({ _id: userId },
  //   { $pull: { created_votings: votingId } }
  // );

  const result = await Voting.deleteOne({ _id: votingId, creator: userId });
}
