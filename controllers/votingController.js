const moment = require("moment");

const User = require("./../models/userModel");
const Voting = require("./../models/votingModel");

const catchAsync = require("./../utils/catchAsync");
const getVotingStatus = require("./../utils/getVotingStatus");
const convertFormat = require("./../utils/convertFormat");

exports.getVotings = catchAsync(async (req, res, next) => {
  const findArgs = {};

  if (req.originalUrl === "/upcoming") {
    findArgs.status = "예정";
  } else if (req.originalUrl === "/ongoing") {
    findArgs.status = "진행중";
  } else if (req.originalUrl === "/ended") {
    findArgs.status = "종료";
  } else if (req.originalUrl === "/canceled") {
    findArgs.status = "취소됨";
  }

  const votings = await Voting.find(findArgs)
    .populate("createdBy")
    .lean();

  votings.forEach(async (voting) => {
    const updatedStatus = getVotingStatus(
      voting.startDate,
      voting.endDate,
      voting.status
    );

    if (updatedStatus !== voting.status) {
      voting.status = updatedStatus;
      await voting.save();
    }
  });

  const convertedVotings = convertFormat(votings);

  res.status(200).render("votingList", {
    status: "success",
    results: votings.length,
    data: {
      votings: convertedVotings,
    },
  });
});

exports.myVotings = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return res.status(200).render("login");
  }

  const userId = req.user.id;
  const myVotings = await User.findById(userId)
    .populate("createHistory")
    .lean();

  const votings = myVotings.createHistory;
  const convertedVotings = convertFormat(votings);

  res.status(200).render("votingList", {
    status: "success",
    data: {
      votings: convertedVotings,
    },
  });
});

exports.votedVotings = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return res.status(200).render("login");
  }

  const userId = req.user.id;
  const votedData = await User.findById(userId)
    .populate("voteHistory")
    .lean();

  const votedVotings = votedData.voteHistory;
  const convertedVotings = convertFormat(votedVotings);

  res.status(200).render("votingList", {
    state: "success",
    data: {
      votings: convertedVotings,
    },
  });
});

exports.getNewVoting = (req, res, next) => {
  if (!req.user) {
    return res.status(200).render("login");
  }

  const startDate = moment().format("YYYY-MM-DDTHH:mm");
  const endDate = moment()
    .add(3, "days")
    .format("YYYY-MM-DDTHH:mm");

  res.status(200).render("createVoting", {
    data: {
      startDate,
      endDate,
    },
  });
};

exports.createNewVoting = async (req, res, next) => {
  if (!req.user) {
    return res.status(200).render("login");
  }

  try {
    const { name, startDate, endDate, options } = req.body;
    const status = getVotingStatus(startDate, endDate);
    const createdBy = req.user.id;
    const createdAt = moment().format("YYYY-MM-DDTHH:mm");
    const convertedStartDate = moment(startDate).format("YYYY-MM-DDTHH:mm");
    const convertedEndDate = moment(endDate).format("YYYY-MM-DDTHH:mm");
    const convertedOptions = options
      .filter((option) => option.length > 0)
      .map((option) => {
        return { option, votee: [] };
      });

    if (new Date() - new Date(endDate) > 0) {
      return res.status(400).render("error", {
        result: "fail",
        message: "종료 시점은 현재 이후여야 합니다.",
      });
    }

    if (new Date(startDate) - new Date(endDate) > 0) {
      return res.status(400).render("error", {
        result: "fail",
        message: "시작 시점은 종료 시점 이후여야 합니다.",
      });
    }

    const newVoting = await Voting.create({
      name,
      createdBy,
      createdAt,
      startDate: convertedStartDate,
      endDate: convertedEndDate,
      status,
      options: convertedOptions,
    });

    await User.findByIdAndUpdate(createdBy, {
      $push: { createHistory: newVoting._id },
    });

    res.status(200).render("createResult", {
      result: "success",
      message: "투표를 성공적으로 등록하였습니다.",
      votingId: newVoting._id,
    });
  } catch (err) {
    res.status(404).render("createResult", {
      result: "fail",
      message: "투표 등록에 실패하였습니다.",
    });
  }
};

exports.getSelectedVoting = catchAsync(async (req, res, next) => {
  const votingId = req.params.id;
  const voting = await Voting.findById(votingId)
    .populate("createdBy")
    .lean();
  const userId = req.user ? req.user.id : "";
  let isCreator = false;

  if (voting.createdBy._id.toString() === userId.toString()) {
    isCreator = true;
  }

  const winner = { option: "", index: 0, count: 0 };

  voting.options.forEach((option, index) => {
    if (winner.count < option.count) {
      winner.count = option.count;
      winner.option = option.option;
      winner.index = index;
    }
  });

  const convertedVoting = convertFormat(voting);

  res.status(200).render("votingPage", {
    status: "success",
    data: {
      voting: convertedVoting,
      isCreator,
      winner,
    },
  });
});

exports.voteVoting = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return res.status(200).json({
      message: "not logged in",
    });
  }

  const userId = req.user.id;
  const userChoice = req.body.choice;
  const votingId = req.params.id;
  const currentVoting = await Voting.findById(votingId);
  const { votedUsers } = currentVoting;

  if (votedUsers.indexOf(userId) !== -1) {
    return res.status(200).json({
      message: "already voted",
    });
  }

  currentVoting.votedUsers = [...currentVoting.votedUsers, userId];
  currentVoting.options = currentVoting.options.map((option) => {
    if (option.option === userChoice) {
      option.count += 1;
    }

    return option;
  });

  await currentVoting.save();
  await User.findByIdAndUpdate(userId, { $push: { voteHistory: votingId } });

  return res.status(200).json({
    message: "success voting",
  });
});

exports.deleteVoting = catchAsync(async (req, res, next) => {
  const voting = await Voting.findByIdAndDelete(req.params.id);

  if (!voting) {
    return res.status(200).json({
      message: "fail",
    });
  }

  return res.status(200).json({
    message: "success",
  });
});

exports.cancelVoting = catchAsync(async (req, res, next) => {
  await Voting.findByIdAndUpdate(req.params.id, { status: "취소됨" });

  return res.status(200).json({
    message: "success",
  });
});
