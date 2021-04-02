const mongoose = require("mongoose");
const format = require("date-fns/format");
const createError = require("http-errors");

const { getUserInfo } = require("../../util/jwtHelper");
const { formatExpirationDate } = require("../../util");

const Vote = require("../../models/Vote");
const User = require("../../models/User");

exports.getAllVotes = async (req, res, next) => {
  console.log(req.session);
  const user = getUserInfo(req.session);
  let votes = await Vote.find()
                        .sort({ expiratin_date: 1 })
                        .populate("author", "name").lean();
  votes = formatExpirationDate(votes);

  res.render("index", { votes, user });
};

exports.getCreatedVotes = async (req, res, next) => {
  const user = getUserInfo(req.session);

  try {
    const userInfo = await User.findOne({ email: user.email });
    let votes = await Vote.find({ author: userInfo._id })
                          .sort({ expiratin_date: 1 })
                          .populate("author", "name").lean();
    votes = formatExpirationDate(votes);

    res.render("my-votings", { votes, user });
  } catch (err) {
    next(createError(500, "이런.. 투표 목록을 가져오는 데 문제가 발생했습니다."));
  }
};

exports.getVote = async (req, res, next) => {
  const user = getUserInfo(req.session);
  const { id } = req.params;

  try {
    const vote = await Vote.findById(id).populate("author", "name").lean();

    vote.expiration_date = {
      date: vote.expiration_date,
      formatted_date: format(vote.expiration_date, "yyyy-MM-dd HH:mm")
    };

    if (vote.expiration_date.date < new Date()) {
      res.redirect(`/votings/${id}/result`);
      return;
    }

    res.render("vote-page", { vote, user });
  } catch (err) {
    next(createError(500, "이런.. 투표 내용을 가져오는 데 문제가 발생했습니다."));
  }
};

exports.getVoteResult = async (req, res, next) => {
  const user = getUserInfo(req.session);
  const { id } = req.params;

  try {
    const vote = await Vote.findById(id).populate("author", "name").lean();

    vote.expiration_date = {
      date: vote.expiration_date,
      formatted_date: format(vote.expiration_date, "yyyy-MM-dd HH:mm")
    };

    const stats = await Vote.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id)
        }
      },
      {
        $addFields: {
          total: {
            $sum: "$options.count"
          }
        }
      },
      {
        $project: {
          options: 1,
          total: 1,
        }
      },
      {
        $unwind: {
          path: "$options",
          includeArrayIndex: "index"
        }
      },
      {
        $group: {
          _id: "$options.title",
          index: {
            $first: "$index"
          },
          count: {
            $first: "$options.count"
          },
          total: {
            $first: "$total"
          }
        }
      },
      {
        $sort: {
          index: 1
        }
      }
    ]);

    res.status(200).render("vote-result", { vote, stats, user });
  } catch (err) {
    next(createError(500, "이런.. 투표 결과를 가져오는 데 실패했습니다."));
  }
};

exports.castVote = async (req, res, next) => {
  const user = getUserInfo(req.session);
  const { id } = req.params;
  let options;

  if (Array.isArray(req.body.options)) {
    options = req.body.options;
  } else {
    options = [req.body.options];
  }

  try {
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
  const { id } = req.params;

  try {
    await Vote.findByIdAndDelete(id);
    await User.updateMany({}, {
      $pull: {
        casted_votes: id
      }
    });

    res.json({ result: "투표가 삭제되었습니다." });
  } catch (err) {
    res.json({ result: "투표 삭제를 실패하였습니다." });
  }
};

exports.createVote = async (req, res, next) => {
  try {
    const user = getUserInfo(req.session);
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

    res.status(201).json({ result: "투표가 생성되었습니다."});
  } catch (err) {
    res.status(500).json({ result: "투표 생성에 실패하였습니다." });
  }
};
