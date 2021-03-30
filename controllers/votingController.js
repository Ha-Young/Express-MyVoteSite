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

  res.status(200).json({
    status: "success",
    results: votings.length,
    data: {
      status: findArgs.status,
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
  const userId = req.user._id;
  const myVotings = await User.findById(userId).populate("createHistory");

  res.status(200).json({
    state: "success",
    votings: myVotings,
  });
});

exports.votedVotings = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const votedData = await User.findById(userId).populate("voteHistory");
  const votedVotings = votedData.map((data) => data.voting);

  res.status(200).json({
    state: "success",
    votings: votedVotings,
  });
});

exports.getNewVoting = (req, res, next) => {
  res.status(200).render("createVoting", {
    data: {
      timeNow: Date.now(),
    },
  });
};

// 새 투표 생성
exports.createNewVoting = catchAsync(async (req, res, next) => {
  // options를 form에서 어떻게 처리하지?
  const { name, startDate, endDate, options } = req.body;
  const status = getVotingStatus(startDate, endDate);
  const createdBy = req.user._id;
  const createdAt = Date.now();

  const newVoting = await Voting.create({
    name,
    createdBy,
    createdAt,
    startDate,
    endDate,
    status,
    options,
  });

  res.status(200).json({
    status: "success",
    data: {
      voting: newVoting,
    },
  });
});

// 새 투표 생성 (성공)
exports.getSuccess = (req, res, next) => {
  // 목록으로 돌아가기 & 투표 보러가기
  res.status(200).json({
    status: "success",
  });
};

// 새 투표 생성 (실패)
exports.getFail = (req, res, next) => {
  // 목록으로 돌아가기
  res.status(200).json({
    status: "success",
  });
};

// 상세 투표 보기
exports.getSelectedVoting = catchAsync(async (req, res, next) => {
  const votingId = req.params.id;
  const voting = await Voting.findById(votingId).lean();
  let results = [];

  if (!voting) {
    return next(new CreateError("해당하는 투표가 없습니다.", 404));
  }

  const userId = req.user._id;
  const userChoice = await User.find(
    { _id: userId },
    { "voteHistory.voting": votingId }
  ).select("voteHistory.answer");

  if (voting.createdBy === userId || voting.status === "종료") {
    const { options } = voting;
    options.forEach((option) => {
      const { votee } = option;
      results.push(votee.length);
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      voting,
      userChoice,
      results,
    },
  });
});

// 투표 하기
exports.voteVoting = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const userChoice = req.body.selected;
  const votingId = req.params.id;
  const voting = await Voting.findById(votingId);

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
  const voting = await Voting.findByIdAndDelete(req.params.id);

  if (!voting) {
    return next(new CreateError("해당하는 투표가 없습니다.", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
