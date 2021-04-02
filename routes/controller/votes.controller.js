const Voting = require("../../models/Voting");
const User = require("../../models/User");

const moment = require("moment");

exports.getAllVotings = async function (req, res, next) {
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format("YYYY-MM-DD");
  const formattedTime = moment(currentDate).format("HH:mm");
  const isLoggedIn = req.session.passport ? true : false;

  await Voting.updateMany(
    {
      $and: [
        { due_date: { $lte: formattedDate } },
        { due_time: { $lte: formattedTime } }
      ]
    },
    { $set: { "status": "CLOSED" } }
  );

  const votings = await Voting.find();

  res.render("index",
    {
      isLoggedIn: isLoggedIn,
      votings: votings
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

  res.render("myVotings",
    {
      isLoggedIn: true,
      myVotings: myVotings
    }
  );
}

exports.showVoteDetails = async function (req, res, next) {
  const id = req.params.vote_id;
  const voting = await Voting.findById(id);
  const creator = await User.findById(voting.creator);
  const isLoggedIn = req.session.passport ? true : false;

  let showResult = false;
  const passport = req.session.passport;

  if (passport && creator._id.toString() === passport.user) {
    showResult = true;
  }

  res.render("votingDetail", {
    isLoggedIn: isLoggedIn,
    voting: voting,
    creator: creator,
    showResult: showResult
  });
}

exports.addOneToSelectedOption = async function (req, res, next) {
  const userId = req.session.passport.user;
  const votingId = req.params.vote_id;
  const selectedOptionName = req.body.name;
  const hasParticipated = await User.find(
    {
      _id: userId,
      participated_votings: votingId
    }
  );

  if (hasParticipated.length) {
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
