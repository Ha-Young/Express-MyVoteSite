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

  try {
    const userInfo = await User.findOne({ email: user.email });
    const votes = await Vote.find({ author: userInfo._id }).populate("author", "name");

    res.render("my-votings", { votes, user });
  } catch (err) {
    next(err);
  }
};

exports.getVote = async (req, res, next) => {
  const user = getUserInfo(req.cookies);
  const { id } = req.params;
  try {
    const vote = await Vote.findById(id).populate("author", "name");

    if (!vote) {
      res.redirect("/");
      return;
    }

    res.render("vote-page", { vote, user });
  } catch (err) {
    next(err);
  }
};

exports.castVote = async (req, res, next) => {
  const user = getUserInfo(req.cookies);
  const { id } = req.params;
  let options;

  if (Array.isArray(req.body.options)) {
    options = req.body.options;
  } else {
    options = [req.body.options];
  }

  try {
    const userInfo = await User.findOne({ email: user.email });

    await User.findOneAndUpdate(
      {email: user.email},
      {
        $push: {
          casted_votes: id
        }
      }
    );

    for (const option of options) {
      await Vote.findOneAndUpdate({
        _id: id,
        "options.title": option
      }, {
        $inc: {
          "options.$.count": 1
        }
      });
    }

    res.status(201).json({ result: "투표를 성공하였습니다." });
  } catch (err) {
    res.status(500).json({ result: "투표를 실패하였습니다." })
  }
};

exports.deleteVote = async (req, res, next) => {
  const user = getUserInfo(req.cookies);
  const { id } = req.params;

  await Vote.findByIdAndDelete(id);
  await User.findOneAndUpdate({
    email: user.email
  }, {
    $pull: {
      casted_votes: id
    }
  });

  res.json({ result: "투표가 삭제되었습니다." });
};

exports.createVote = async (req, res, next) => {
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
    res.status(500).render("error", { message: "error", user });
  }
};
