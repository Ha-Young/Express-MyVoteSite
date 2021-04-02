const Vote = require("../../models/Vote");
const User = require("../../models/User");

exports.getAll = async function (req, res, next) {
  try {
    const votes = await Vote.find();
    const name = req.user.name;
    res.status(200);
    res.render("index", { votes, name });
  } catch (err) {
    next(err);
  }
};

exports.renderMyVotings = async function (req, res, next) {
  try {
    const userId = req.user._id;
    const name = req.user.name;
    const user = await User.findOne({_id: userId});

    const createdVote = user.created_votes;
    const myVotings = [];

    for (let i = 0; i < createdVote.length; i++) {
      const vote = await Vote.findOne({_id: createdVote[i]});
      myVotings.push(vote);
    }

    res.status(200).render("myVotings", { myVotings, name });
  } catch (err) {
    next(err);
  }
};
