const User = require("./../models/userModel");
const Voting = require("./../models/votingModel");
const APIFeatures = require("./../utils/apiFeatures");
const CreateError = require("./../utils/createError");
const catchAsync = require("./../utils/catchAsync");
const getVotingStatus = require("./../utils/getVotingStatus");

exports.getAllVotings = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Voting.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const votings = await features.query;

  votings.forEach((voting) => {
    const currentStatus = getVotingStatus(voting.startDate, voting.endDate);

    if (currentStatus !== voting.status) {
      voting.status = currentStatus;
      voting.save();
    }
  });

  res.status(200).json({
    status: "success",
    results: votings.length,
    data: {
      votings,
    },
  });
});

// 내 투표 보기
exports.getMyVotings = catchAsync(async (req, res, next) => {
  // 각 Voting마다 있는 createdBy를 이용해서 처리하는 법
  // const userId = req.user._id;
  // const myVotings = await Voting.aggregate([
  //   {
  //     $match: { createdBy: { $eq: userId } },
  //   },
  //   {
  //     $group: {
  //       _id: "$status",
  //       countByStatus: { $sum: 1 },
  //       startDate: "$startAt",
  //       endDate: "$startAt",
  //       createdAt: "$createdAt",
  //     },
  //   },
  //   {
  //     $sort: { createdAt: -1 },
  //   },
  // ]);
  // User한테 createVotings Schema를 줘서 처리하는 법
  const userId = req.user._id;
  const myVotings = await User.findById(userId)
    .where("createVotings")
    .aggregate([
      {
        $group: {
          _id: "$status",
          countByStatus: { $sum: 1 },
          name: "$name",
          status: "$status",
          startDate: "$startAt",
          endDate: "$startAt",
          createdAt: "$createdAt",
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

  res.status(200).json({
    state: "success",
    data: {
      votings: myVotings,
    },
  });
});

// 새 투표 생성창
exports.getNewVoting = (req, res, next) => {
  res.status(200).render("createVoting", {
    data: {
      timeNow: Date.now(),
    },
  });
};

// 새 투표 생성
exports.createNewVoting = catchAsync(async (req, res, next) => {
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
  res.status(200).json({
    status: "success",
  });
};

// 새 투표 생성 (실패)
exports.getFail = (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
};

// 상세 투표 보기
exports.getSelectedVoting = catchAsync(async (req, res, next) => {
  const votingId = req.params.id;
  const voting = await Voting.findById(votingId);

  if (!voting) {
    return next(new CreateError("해당하는 투표가 없습니다.", 404));
  }

  // 사용자가 참여한 투표의 경우, 투표한 상태를 출력
  const userId = req.user._id;
  const userChoice = await User.findById(userId).aggregate([{ $match: {} }]);

  // status에 따라 투표 상태 변경

  if (userChoice) {
    console.log("testing");
  }

  res.status(200).json({
    status: "success",
    data: {
      voting,
      userChoice,
    },
  });
});

// 투표 하기
exports.participateVoting = catchAsync(async (req, res, next) => {
  const userChoice = req.body.selected;
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
