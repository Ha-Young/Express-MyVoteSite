const User = require("./../models/userModel");
const createToken = require("./../utils/createToken");
const catchAsync = require("./../utils/catchAsync");

exports.getSignUp = (req, res, next) => {
  res.status(200).render("signup");
};

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  if (password !== passwordConfirm) {
    return res.status(400).render("error", {
      message: "비밀번호가 일치하지 않습니다.",
    });
  }

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
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
  res.status(200).render("login", {
    id: req.query?.id,
  });
};

exports.postLogIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).render("error", {
      message: "이메일과 비밀번호를 모두 입력하세요.",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).render("error", {
      message: "해당하는 유저가 없습니다.",
    });
  }

  const isPasswordCorrect = user.comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).render("error", {
      message: "비밀번호가 틀렸습니다.",
    });
  }

  const token = createToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  if (req.query && req.query.id) {
    res.status(201).redirect(`/votings/${req.query.id}`);
  } else {
    res.status(201).redirect("/");
  }
});

exports.getLogOut = (req, res, next) => {
  res.status(200).render("logout");
};

exports.logOut = (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
  });
};
