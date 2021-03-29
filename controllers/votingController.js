const Voting = require("./../models/votingModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");

exports.getAllVotings = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Voting.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const votings = await features.query;

  res.status(200).json({
    status: "success",
    results: votings.length,
    data: {
      votings,
    },
  });
});

// 내 투표 보기
exports.getMyVotings = catchAsync(async (req, res, next) => {});

// 새 투표 생성창
exports.getNewVoting = (req, res, next) => {};

// 새 투표 생성
exports.postNewVoting = (req, res, next) => {};

// 새 투표 생성 (성공)
exports.getSuccess = (req, res, next) => {};

// 새 투표 생성 (실패)
exports.getFail = (req, res, next) => {};

// 상세 투표 보기
exports.getCurrentVoting = catchAsync(async (req, res, next) => {});

// 투표 하기
exports.postCurrentVoting = catchAsync(async (req, res, next) => {});

// 투표 삭제
exports.deleteCurrentVoting = (req, res, next) => {};
