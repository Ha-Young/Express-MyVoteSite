const crypto = require("crypto");

const User = require("./../models/userModel");
const createToken = require("./../utils/createToken");
const CreateError = require("./../utils/createError");
const catchAsync = require("./../utils/catchAsync");
const sendEmail = require("./../utils/sendEmail");

exports.getSignUp = (req, res, next) => {
  res.status(200).render("signup");
};

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

  const cookieOptions = {
    expires: new Date(
      Date.now + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  res.status(201).redirect("/");
});

exports.getLogIn = (req, res, next) => {
  res.status(200).render("login");
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

  const cookieOptions = {
    expires: new Date(
      Date.now + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

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
  const mailContents = `비밀번호를 잊어버리셨다면 아래 링크로 가서 비밀번호를 재설정 해주시기 바랍니다. \n\n ${resetURL}.\n\n 본인이 요청한 메일이 아닐 경우 무시해주시기 바랍니다.`;
  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: user.email,
      subject: "비밀번호 재설정 확인 메일입니다. (valid for 10 minutes)",
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
        "비밀번호 재설정 메일 발송 중 문제가 생겼습니다. 나중에 다시 시도해주세요.",
        500
      )
    );
  }
});

exports.getResetPassword = (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
};

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new CreateError("Invalid token or token has expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  const token = await createToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  res.status(200).json({
    status: "success",
    token,
  });
});

exports.deleteUser = (req, res, next) => {};

exports.getLogOut = (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
  });
};
