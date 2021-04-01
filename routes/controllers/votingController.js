const createError = require("http-errors");

const User = require("../../models/User");
const Voting = require("../../models/Voting");

const getDateFormat = require("../../utils/getDateFormat");
const validateDate = require("../../utils/validateDate");

const Controller = {};

Controller.getAllVotings = async (req, res, next) => {
  try {
    const votings = await Voting.find();
    const currentUser = req.user;

    votings.forEach(async (voting) => {
      const votingEndDate = voting.endDate;
      const isProgress = validateDate(votingEndDate, Date.now());

      if (!isProgress && voting.isProgress) {
        voting.isProgress = isProgress;
        await voting.save();
      }
    });

    res.render("index", { votings, user: currentUser });
  } catch (error) {
    console.error(error.message);
    next(createError(500, "Server Error"));
  }
};

Controller.getNewVoting = async (req, res, next) => {
  try {
    const votings = await Voting.find();

    res.render("newVoting", { votings });
  } catch (error) {
    console.error(error.message);
    next(createError(500, "Server Error"));
  }
};

Controller.postNewVoting = async (req, res, next) => {
  try {
    const currentUserId = req.user._id;
    const { title } = req.body;
    const endDate = getDateFormat(req.body["end-date"]);
    const isProgress = validateDate(endDate, Date.now());

    if (!isProgress) {
      return res.render("failure", { message: "현재 시간 이후를 입력하십시오" });
    }

    const filteredOptions = req.body.option.filter(option => option.length > 0);
    const options = filteredOptions.map(option => {
      return { title: option, value: 0 };
    });

    const newVoting = new Voting({
      title,
      endDate,
      options,
      user: currentUserId,
    });

    await newVoting.save();

    const user = await User.findById({ _id: currentUserId });

    user.votingList.push(newVoting._id);

    await user.save();
    res.render("success", {
      message: "투표를 생성했습니다.",
      newVoting,
    });
  } catch (error) {
    console.error(error.message);
    next(createError(500, "Server Error"));
  }
};

Controller.getMyVotings = async (req, res, next) => {
  try {
    const currentUserId = req.user._id;

    User.findById({ _id: currentUserId })
      .populate("votingList")
      .exec((error, voting) => {
        if (error) {
          console.error(error.message);
          return next(createError(500, "Server Error"));
        }

        res.render("myVotings", { myVotings: voting.votingList });
      });
  } catch (error) {
    console.error(error.message);
    next(createError(500, "Server Error"));
  }
};

Controller.getDetailVoting = async (req, res, next) => {
  try {
    const currentVotingId = req.params.id;
    const voting = await Voting.findById({ _id: currentVotingId });
    const currentUser = req.user;
    let isAuthor = false;

    Voting.findById({ _id: currentVotingId })
      .populate("user")
      .exec((err, data) => {
        if (err) return res.render("error", { message: err.message });
        if (currentUser) {
          isAuthor = (currentUser._id.toString() === data.user._id.toString());
        }

        if (voting.isProgress) {
          res.render("detailVoting", {
            voting,
            author: data.user.email,
            isAuthor,
          });
        } else {
          let highestOption = { value: 0 };

          voting.options.forEach(option => {
            if (highestOption.value < option.value) {
              highestOption = option;
            }
          });

          res.render("resultVoting", {
            voting,
            author: data.user.email,
            isAuthor,
            highestOption,
          });
        }
      });
  } catch (error) {
    console.error(error.message);
    next(createError(500, "Server Error"));
  }
};

Controller.patchDetailVoting = async (req, res, next) => {
  try {
    const { checkedOption } = req.body;
    const votingId = req.params.id;
    const userId = req.user._id;

    const voting = await Voting.findById({ _id: votingId });

    const isVotedUser = voting.votingUserList.some(userVotedId =>
      userVotedId.toString() === userId.toString()
    );

    if (!isVotedUser) {
      voting.options.forEach(option => {
        if (option.title === checkedOption) {
          option.value += 1;
        }
      });

      voting.votingUserList.push(userId);

      await voting.save();

      res.json({ status: 200, message: "투표 성공" });
    } else {
      return res.json({ status: 400, message: "이미 투표하셨습니다." });
    }
  } catch (error) {
    console.error(error.message);
    next(createError(500, "Server Error"));
  }
};

Controller.deleteVoting = async (req, res, next) => {
  try {
    const votingId = req.params.id;
    const currentUserId = req.user._id;

    await Voting.findByIdAndDelete({ _id: votingId });

    const user = await User.findById({ _id: currentUserId });

    user.votingList.forEach((voting, index) => {
      if (voting.toString() === votingId) {
        user.votingList.splice(index, 1);
      }
    });

    await user.save();

    res.status(201).end();
  } catch (error) {
    console.error(error.message);
    next(createError(500, "Server Error"));
  }
};

module.exports = Controller;
