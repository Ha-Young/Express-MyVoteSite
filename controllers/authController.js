const User = require("./../models/userModel");
const createToken = require("./../utils/createToken");
const CreateError = require("./../utils/createError");
const catchAsync = require("./../utils/catchAsync");
const sendEmail = require("./../utils/sendEmail");

exports.getSignUp = (req, res, next) => {};

exports.createUser = catchAsync(async (req, res, next) => {
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

exports.getLogIn = (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
};

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

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new CreateError("일치하는 사용자가 없습니다.", 404));
  }

  const resetToken = user.createPasswordResetToken();
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/users/resetPassword/${resetToken}`;
  const mailContents = `If you Forgot your password, change your password at the link below \n\n ${resetURL}.\n\n If you didn't forget your password, please ignore this email!`;
  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 minutes)",
      message: mailContents,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new CreateError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

exports.getResetPassword = (req, res, next) => {};

exports.resetPassword = (req, res, next) => {};

exports.deleteUser = (req, res, next) => {};

exports.getLogOut = catchAsync(async (req, res, next) => {});
