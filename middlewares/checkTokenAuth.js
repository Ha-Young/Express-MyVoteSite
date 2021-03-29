const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const CreateError = require("./../utils/createError");
const User = require("./../models/userModel");

module.exports = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;
  let token;

  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  }

  if (!token) {
    return next(new CreateError("로그인이 필요합니다.", 401));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new CreateError("로그인이 필요합니다.", 401));
  }

  if (currentUser.changePasswordAfter(decoded.iat)) {
    return next(
      new CreateError("토큰이 만료되었습니다. 로그인이 필요합니다.", 401)
    );
  }

  req.user = currentUser;
  next();
});
