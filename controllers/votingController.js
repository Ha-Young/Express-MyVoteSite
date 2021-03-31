const moment = require("moment");

const User = require("./../models/userModel");
const Voting = require("./../models/votingModel");
const CreateError = require("./../utils/createError");
const catchAsync = require("./../utils/catchAsync");
const getVotingStatus = require("./../utils/getVotingStatus");

exports.getVotings = catchAsync(async (req, res, next) => {
  const findArgs = {};

  if (req.params === "upcoming") {
    findArgs.status = "예정";
  } else if (req.params === "ongoing") {
    findArgs.status = "진행중";
  } else if (req.params === "ended") {
    findArgs.status = "종료";
  } else if (req.params === "canceled") {
    findArgs.status = "취소됨";
  }

  const votings = await Voting.find(findArgs);

  votings.forEach(async (voting) => {
    const currentStatus = getVotingStatus(voting.startDate, voting.endDate);

    if (currentStatus !== voting.status) {
      voting.status = currentStatus;
      await voting.save();
    }
  });

  res.status(200).render("votingList", {
    status: "success",
    results: votings.length,
    data: {
      votings,
    },
  });
});

exports.getSearchedVotings = catchAsync(async (req, res, next) => {
  const searchKeyword = req.params.serch_keyword;
  const searchedVotings = await Voting.find({
    name: { $search: searchKeyword },
  });

  if (!searchedVotings) {
    return next(new CreateError("검색 중 문제가 발생했습니다.", 400));
  }

  res.status(200).json({
    status: "success",
    data: {
      votings: searchedVotings,
    },
  });
});

exports.myVotings = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const myVotings = await User.findById(userId).populate("createHistory");

  res.status(200).json({
    state: "success",
    votings: myVotings,
  });
});

exports.votedVotings = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const votedData = await User.findById(userId).populate("voteHistory");
  const votedVotings = votedData.map((data) => data.voting);

  res.status(200).json({
    state: "success",
    votings: votedVotings,
  });
});

exports.getNewVoting = (req, res, next) => {
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
  try {
    const { name, startDate, endDate, options } = req.body;
    const status = getVotingStatus(startDate, endDate);

    // const createdBy = req.user.id;
    const createdAt = moment().format("YYYY-MM-DDTHH:mm");
    const convertedStartDate = moment(startDate).format("YYYY-MM-DDTHH:mm");
    const convertedEndDate = moment(endDate).format("YYYY-MM-DDTHH:mm");
    const convertedOptions = options
      .filter((option) => option.length > 0)
      .map((option) => {
        console.log(option);
        return { option, votee: [] };
      });

    const newVoting = await Voting.create({
      name,
      // createdBy,
      createdAt,
      startDate: convertedStartDate,
      endDate: convertedEndDate,
      status,
      options: convertedOptions,
    });

    res.status(200).render("success", {
      status: "success",
      data: {
        voting: newVoting,
      },
    });
  } catch (err) {
    res.status(404).render("failure", {
      status: "fail",
    });
  }
};

exports.getSelectedVoting = catchAsync(async (req, res, next) => {
  const votingId = req.params.id;
  const voting = await Voting.findById(votingId).lean();
  // const results = [];

  if (!voting) {
    return next(new CreateError("해당하는 투표가 없습니다.", 404));
  }

  // 내가 투표 주인인지 확인 => cancel버튼, result 보이기

  // const userId = req.user.id;
  // const userChoice = await User.find(
  //   { _id: userId },
  //   { "voteHistory.voting": votingId }
  // ).select("voteHistory.answer");

  // if (voting.createdBy === userId || voting.status === "종료") {
  //   const { options } = voting;
  //   options.forEach((option) => {
  //     const { votee } = option;
  //     results.push(votee.length);
  //   });
  // }

  res.status(200).render("votingPage", {
    status: "success",
    data: {
      voting,
      // userChoice,
      // results,
    },
  });
});

// 투표 하기
exports.voteVoting = catchAsync(async (req, res, next) => {
  // const userId = req.user._id;
  const userChoice = req.body.choice;
  const choiceNumber = req.body.number;
  const votingId = req.params.id;
  const voting = await Voting.findById(votingId);

  console.log(req.body);

  // Voting의 옵션 업데이트하기

  // User의 votedVotings 업데이트하기
  // const updatedUser = await User.findByIdAndUpdate(userId, {})

  res.status(200).json({
    status: "success",
    data: {
      voting,
      userChoice,
    },
  });
});

// 투표 삭제
exports.deleteVoting = catchAsync(async (req, res, next) => {
  const voting = await Voting.findByIdAndDelete(req.params.id);

  if (!voting) {
    return next(new CreateError("해당하는 투표가 없습니다.", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.cancelVoting = catchAsync(async (req, res, next) => {
  res.status(204).json({
    status: "success",
  });
});
