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
      votings,
    },
  });
});

exports.upcomingVotings = catchAsync(async (req, res, next) => {});
exports.ongoingVotings = catchAsync(async (req, res, next) => {});
exports.endedVotings = catchAsync(async (req, res, next) => {});
exports.canceledVotings = catchAsync(async (req, res, next) => {});

exports.myVotings = catchAsync(async (req, res, next) => {
  // 내가 만든 투표 보기
  // 내가 만든 투표 id들 펼쳐서
  // populate한 뒤에
  // 상태별로 sorting
  res.status(200).json({
    state: "success",
  });
});

exports.votedVotings = catchAsync(async (req, res, next) => {
  // 내가 참여한 투표 보기
  // 내가 참여한 투표 id들 펼쳐서
  // populate한 뒤에
  // 넘겨주기
  res.status(200).json({
    state: "success",
  });
});

// 새 투표 생성창 입장
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
  const voting = await Voting.findById(votingId);

  if (!voting) {
    return next(new CreateError("해당하는 투표가 없습니다.", 404));
  }

  // 사용자가 참여한 투표의 경우, 투표한 상태를 보여주기
  const userId = req.user._id;
  const userChoice = await User.findById(userId).aggregate([{ $match: {} }]);

  // status에 따라 결과 출력 여부 결정

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
exports.voteVoting = catchAsync(async (req, res, next) => {
  const votingId = req.params.id;
  const voting = await Voting.findById(votingId);
  const userChoice = req.body.selected;

  // Voting의 옵션 업데이트하기

  // User의 votedVotings 업데이트하기

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
