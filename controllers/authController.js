const User = require("./../models/userModel");
const createToken = require("./../utils/createToken");
// const CreateError = require("./../utils/createError");
const catchAsync = require("./../utils/catchAsync");

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
  console.log(email);
  console.log(!email);
  console.log(password);
  console.log(!password);

  if (!email || !password) {
    console.log("이메일과 비밀번호를 모두 입력하세요.");
    return res.status(401).json({
      message: "이메일과 비밀번호를 모두 입력하세요.",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  console.log("여기까지 통과함");

  if (!user) {
    console.log("해당하는 유저가 없습니다.");
    return res.status(401).json({
      message: "해당하는 유저가 없습니다.",
    });
  }

  console.log("여기까지 통과함");
  console.log(password);
  console.log(user.password);

  const isPasswordCorrect = user.comparePassword(password, user.password);

  console.log("여기까지 통과함");

  if (!isPasswordCorrect) {
    console.log("비밀번호가 틀렸습니다.");
    return res.status(401).json({
      message: "비밀번호가 틀렸습니다.",
    });
  }

  console.log("여기까지 통과함");

  const token = createToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  res.status(201).redirect();
});

exports.deleteUser = (req, res, next) => {};

exports.logOut = (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
  });
};
