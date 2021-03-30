const Vote = require("../../models/Vote");
const User = require("../../models/User");
const { getUserInfo } = require("../../util/jwtHelper");

exports.getAllVotes = async (req, res, next) => {
  const user = getUserInfo(req.cookies);
  const votes = await Vote.find().populate("author", "name");

  res.render("index", { votes, user });
};

exports.getCreatedVotes = async (req, res, next) => {
  const user = getUserInfo(req.cookies);
  const userInfo = await User.findOne({ email: user.email });
  const votes = await Vote.find({ author: userInfo._id }).populate("author", "name");

  res.render("my-votings", { votes, user });
};

exports.saveVote = async (req, res, next) => {
  try {
    const user = getUserInfo(req.cookies);
    const userInfo = await User.findOne({ email: user.email });

    const options = req.body.option_title;
    const optionList = options.map(option => {
      return {
        title: option,
        count: 0
      }
    });

    const vote = new Vote({
      title: req.body.title,
      expiration_date: req.body.expiration_date,
      author: userInfo._id,
      options: optionList
    });

    await vote.save();
    res.status(201).render("success", { message: "success!!!!!", user });
  } catch (err) {
    next(err);
  }
};
