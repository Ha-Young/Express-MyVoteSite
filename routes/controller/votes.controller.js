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

  const myVotings = await Voting.find(
    {
      _id: { $in: myVotingsIdList }
    }
  );

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

  res.render("votingDetail",
    {
      isLoggedIn: isLoggedIn,
      voting: voting,
      creator: creator,
      showResult: showResult
    }
  );
}

exports.addOneToSelectedOption = async function (req, res, next) {
  const userId = req.session.passport.user;
  const votingId = req.params.vote_id;
  const voting = await Voting.findById(votingId);
  const selectedOptionName = req.body.name;
  const hasParticipated = await User.find(
    {
      _id: userId,
      participated_votings: votingId
    }
  );

  if (hasParticipated.length || voting.status === "CLOSED") {
    return res.render("index");
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

  await Voting.updateOne(
    { _id: votingId },
    { candidates: candidates }
  );
}

exports.createVoting = async function (req, res) {
  const title = req.body.title;
  const date = req.body.date;
  const time = req.body.time;
  const options = req.body.options;
  const creatorId = req.session.passport.user;
  const candidates = [];

  if (!title || !options[0] || !options[1]) {
    res.render("createVoting", { message: "모든 필드를 입력해주세요" });
    return;
  }

  for (let i = 0; i < options.length; i++) {
    candidates.push({ name: options[i] });
  }

  const creator = await User.findById(creatorId);
  const creatorUsername = creator.username;

  const newVoting = {
    title: title,
    creator: creatorId,
    creator_username: creatorUsername,
    due_date: date,
    due_time: time,
    candidates: candidates,
  };
  const createdVoting = await new Voting(newVoting).save();

  await User.updateOne(
    { _id: creatorId },
    { $push: { created_votings: createdVoting._id } }
  );

  res.redirect("/");
}

exports.deleteVoting = async function (req, res, next) {
  const userId = req.session.passport.user;
  const votingId = req.params.vote_id;

  await Voting.deleteOne({ _id: votingId, creator: userId });
}
