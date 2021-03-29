const User = require("./../models/votingModel");
const createToken = require("./../utils/createToken");
const CreateError = require("./../utils/createError");
const catchAsync = require("./../utils/catchAsync");

exports.getSignUp = (req, res, next) => {};

exports.postSignUp = catchAsync(async (req, res, next) => {
  const {
    name,
    email,
    password,
    passwordConfirm,
    passwordChangedAt,
  } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    passwordChangedAt,
  });

  const token = createToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.getLogIn = (req, res, next) => {};

exports.postLogIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new CreateError("이메일과 비밀번호를 모두 입력하세요."));
  }

  const user = await User.findOne({ email }).select("+password");
  const isPasswordCorrect = user.comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    next(new CreateError("비밀번호가 틀렸습니다."));
  }

  const token = createToken(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
});

exports.forgotPassword = (req, res, next) => {};

exports.resetPassword = (req, res, next) => {};

exports.deleteUser = (req, res, next) => {};

exports.getLogOut = catchAsync(async (req, res, next) => {});
