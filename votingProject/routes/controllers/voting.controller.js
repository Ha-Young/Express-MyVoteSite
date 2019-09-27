const User = require("../../models/User");
const Voting = require("../../models/Voting");

exports.getAll = async function(req, res, next) {
  try {
    const votingList = await Voting.find();
    const voteInfo = await Promise.all(
      votingList.map(async vote => {
        const createUser = await User.findById(vote.created_by);
        const voteDoc = JSON.parse(JSON.stringify(vote._doc));
        const expiredDate = new Date(vote.expired_date);
        const now = new Date();
        const inProgress = Boolean(expiredDate - now > 0);

        voteDoc["created_by"] = createUser.name;
        voteDoc.inProgress = inProgress;

        return voteDoc;
      })
    );

    res.render("index", { user: req.user, voteInfo });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: "Internal Server Error"
    });
  }
};

exports.getMyVote = async function(req, res, next) {
  try {
    const votingList = await Voting.find({ created_by: req.user._id });
    const voteInfo = await Promise.all(
      votingList.map(async vote => {
        const voteDoc = JSON.parse(JSON.stringify(vote._doc));
        const expiredDate = new Date(vote.expired_date);
        const now = new Date();
        const inProgress = Boolean(expiredDate - now > 0);

        voteDoc.inProgress = inProgress;

        return voteDoc;
      })
    );

    res.render("votings", { user: req.user, voteInfo });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: "Internal Server Error"
    });
  }
};

exports.getSelectedVote = async function(req, res, next) {
  try {
    const selectedVote = await Voting.findOne({ _id: req.params.id });
    const selectedVoteDoc = JSON.parse(JSON.stringify(selectedVote._doc));
    const expiredDate = new Date(selectedVote.expired_date);
    const now = new Date();
    const inProgress = Boolean(expiredDate - now > 0);
    let numberOfResult = 0;
    let hasVoted = false;

    selectedVoteDoc.options.forEach(option => {
      numberOfResult = Math.max(option.people.length, numberOfResult);
      option.people.forEach(person => {
        if(person === String(req.user._id)) {
          hasVoted = true;
        }
      });
    });

    let titleOfResult = selectedVoteDoc.options.filter(option => {
      if(option.people.length === numberOfResult) {
        return option;
      }
    });

    selectedVoteDoc.inProgress = inProgress;
    selectedVoteDoc.titleOfResult = titleOfResult;
    selectedVoteDoc.hasVoted = hasVoted;

    res.render("votingRoom", { user: String(req.user._id), selectedVoteDoc });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: "Internal Server Error"
    });
  }
};

exports.createVote = async function(req, res, next) {
  try {
    const options = req.body.options.map(option => {
      return { title: option, people: [] };
    });

    const newVote = new Voting({
      title: req.body.title,
      created_by: req.user,
      expired_date: req.body.expired_date,
      options
    });

    await newVote.save();
    res.redirect("/votings/success");
  } catch (err) {
    res.redirect("/votings/error");
  }
};

exports.updateVote = async function(req, res, next) {
  try {
    const selectedVote = await Voting.findOne({ _id: req.params.id });
    selectedVote.options.find(option => {
      if (String(option._id) === req.body.selectedOption) {
        option.people.push(req.user);
      }
    });

    await selectedVote.save();

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: "Internal Server Error"
    });
  }
};

exports.deleteVote = async function(req, res, next) {
  try {
    await Voting.findByIdAndDelete({ _id: req.params.id });

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: "Internal Server Error"
    });
  }
}
