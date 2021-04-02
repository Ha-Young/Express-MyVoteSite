const { check, validationResult } = require("express-validator");
const format = require("date-fns/format");
const { getUserInfo } = require("../../util/jwtHelper");
const bcrypt = require("bcrypt");
const User = require("../../models/User");

exports.validateUser = [
  check("email")
    .isEmail()
    .withMessage("유효하지 않은 이메일입니다.")
    .custom(async value => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("이미 존재하는 이메일입니다.");
      }
      return true;
    }),
  check("name")
    .isLength({ min: 2, max: 10 })
    .withMessage("이름은 최소 2글자 이상이어야 합니다."),
  check("password")
    .isLength({ min: 8, max: 12 })
    .withMessage("비밀번호는 8자리에서 12자리 사이여야 합니다.")
    .matches(/\d/)
    .withMessage("비밀번호는 최소 하나의 숫자를 포함해야 합니다.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("비밀번호는 최소 하나의 특수문자를 포함해야 합니다."),
  check("confirmedPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("비밀번호를 동일하게 입력해주세요.");
      }
      return true;
    }),
  (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(422).json({ error: result.errors[0] });
    }
    next();
  }
];

exports.validateLogin = [
  check("email")
    .isEmail()
    .withMessage("유효하지 않은 이메일입니다.")
    .custom(async value => {
      const user = await User.findOne({ email: value });
      if (!user) {
        throw new Error("존재하지 않는 이메일입니다.");
      }
      return true;
    }),
  check("password")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: req.body.email });
      const isMatched = await bcrypt.compare(value, user.password);
      if (!isMatched) {
        throw new Error("비밀번호를 확인해주세요.");
      }
      return true;
    }),
  (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(422).json({ error: result.errors[0] });
    }
    next();
  }
];

exports.validateCreatingVote = [
  check("title")
    .isLength({ min: 1})
    .withMessage("투표 제목을 입력해주세요."),
  check("expiration_date")
    .custom(value => {
      const today = format(new Date(), "yyyy-MM-dd'T'HH:mm");
      if (value < today) {
        throw new Error("만료기간은 현 시각보다 늦어야합니다.");
      }
      return true;
    }),
  check("option_title")
    .isLength({ min: 1 })
    .withMessage("옵션 제목을 입력해야 합니다.")
    .custom(value => {
      if (!Array.isArray(value) || value.length < 2) {
        throw new Error("옵션은 최소 두 개 이상이어야 합니다.");
      }
      if (value.length > 8) {
        throw new Error("옵션은 최대 8개까지 가능합니다.");
      }
      return true;
    }),
  (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(422).json({ error: result.errors[0] });
    }

    next();
  }
];

exports.validateCastingVote = [
  check("options")
    .custom(async (value, { req }) => {
      const { id } = req.params;
      const user = getUserInfo(req.session);
      const userInfo = await User.findOne({ email: user.email });
      const isCasted = userInfo.casted_votes.find(vote => vote.toString() === id);

      if (value.length === 0) {
        throw new Error("최소 하나의 옵션을 선택해야 합니다.");
      }

      if (isCasted) {
        throw new Error("이미 투표를 했습니다.");
      }

      return false;
    }),
  async (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(422).json({ error: result.errors[0] });
    }

    next();
  }
];
