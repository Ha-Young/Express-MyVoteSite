const dayjs = require("dayjs");
const { convertDate } = require("../../utils/conversion");

const Vote = require("../../models/Vote");
const User = require("../../models/User");

exports.renderSuccess = function (req, res, next) {
  try {
    successMessage = req.flash();
    res.status(200).render("success", successMessage);
  } catch (err) {
    next(err);
  }
};

exports.renderNewVoting = function (req, res, next) {
  try {
    const name = req.user.name;
    res.status(200).render("newVoting", { name });
  } catch (err) {
    next(err);
  }
};

exports.postNewVoting = async function (req, res, next) {
  try {
    const { title, day, hour, minute, option } = req.body;
    const author = req.user.name;
    const userId = req.user._id;
    const createdAt = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const expiredAt = convertDate(createdAt, day, hour, minute);

    if (expiredAt === createdAt) {
      res.render("newVoting", { message: resultMessage.INVALID_PERIOD });
      return;
    }

    const options = [];

    for (let i = 0; i < option.length; i++) {
      if (option[i].length === 0) {
        break;
      }

      options.push({ content: option[i], count: 0 });
    }

    const newVote = await Vote.create({
      title,
      author,
      expiredAt,
      options,
    });

    await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { created_votes: [ newVote._id ] } },
    );

    req.flash("message", resultMessage.SUCCESS_CREATE_VOTE);
    res.redirect("/votings/success");
  } catch (err) {
    next(err);
  }
};

exports.renderVoting = async function (req, res, next) {
  try {
    const voteId = req.params.id;
    const vote = await Vote.findOne({ _id: voteId });
    let name;

    if (req.user) {
      name = req.user.name;
    }

    res.status(200).render("voting", { vote, name });
  } catch (err) {
    next(err);
  }
};

exports.castVote = async function (req, res, next) {
  try {
    const voteId = req.params.id;
    const optionId = req.body.id;
    const userId = req.user._id;

    const vote = await Vote.findOne({ _id: voteId });
    const isParticipated = vote.participated_users.some(user =>
      user.toString() === userId.toString()
    );

    if (isParticipated) {
      res.status(200).json({ "participated": true });
      return;
    }

    vote.options.map((option) => {
      if (option._id.toString() === optionId) {
        option.count += 1;
      }
    });

    await vote.save();
    await Vote.findOneAndUpdate(
      { _id: voteId },
      { $addToSet: { participated_users: [ userId ] } }
    );

    res.status(200).json({ "success": true });
  } catch (err) {
    next(err);
  }
};

exports.deleteVote = async function (req, res, next) {
  try {
    const voteId = req.params.id;
    const userId = req.user._id;

    await Vote.findOneAndDelete({ _id: voteId });

    const user = await User.findOne({ _id: userId });
    const createdVotes = user.created_votes;

    for (let i = 0; i < createdVotes.length; i++) {
      if (createdVotes[i]._id.toString() === voteId.toString()) {
        createdVotes.splice(i, 1);
      }
    }

    await user.save();
    res.status(200).json({ "success": true });
  } catch (err) {
    next(err);
  }
};
