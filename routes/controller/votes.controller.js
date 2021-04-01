const Voting = require("../../models/Voting");
const User = require("../../models/User");

exports.getAllVotings = async function (req, res, next) {
  let myVotings = [];
  let creatorId;

  if (req.session.passport) {
    creatorId = req.session.passport.user;
    const myVotingIdList = await User.findById(creatorId);

    myVotings = await Voting.find({
      creator: { $in: myVotingIdList }
    });
  }

  const notMyVotings = await Voting.find(
    { creator: { $ne: creatorId } }
  );

  res.render("index",
    {
      myVotings: myVotings,
      notMyVotings: notMyVotings
    }
  );
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

  const hasParticipated = await User.find(
    { _id: userId },
    { participated_votings: votingId }
  );

  if (hasParticipated) {
    res.render("index");
    return;
  }

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

  await Voting.deleteOne({ _id: votingId, creator: userId });
}
