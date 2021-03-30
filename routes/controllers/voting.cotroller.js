const Vote = require("../../models/Vote");
const User = require("../../models/User");
const { getUserInfo } = require("../../util/jwtHelper");

exports.getAllVotes = async (req, res, next) => {
  const user = getUserInfo(req.cookies);
  const votes = await Vote.find().populate("author", "name");

  res.render("index", { votes, user });
};

exports.saveVote = async (req, res, next) => {
  try {
    const userInfo = getUserInfo(req.cookies);
    const user = await User.findOne({ email: userInfo.email });

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
      author: user._id,
      options: optionList
    });

    await vote.save();
    res.status(201).render("success", { message: "success!!!!!" });
  } catch (err) {
    next(err);
  }
}
