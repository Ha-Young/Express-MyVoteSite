const mongoose = require("mongoose");
const { Schema } = mongoose;
const {
  Types: { ObjectId, Mixed },
} = Schema;

const OptionSchema = new Schema({
  name: Mixed,
  votee: {
    type: [ObjectId],
    ref: "User",
  },
});

const VotingSchema = new Schema({
  name: {
    type: String,
    required: [true, "투표 제목을 입력하세요."],
    maxlength: [40, "투표 제목은 5글자에서 40글자 이내 여야 합니다."],
    minlength: [5, "투표 제목은 5글자에서 40글자 이내 여야 합니다."],
  },
  creator: {
    type: ObjectId,
    ref: "User",
    required: [true, "투표 생성자가 필요합니다."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startAt: {
    type: Date,
    required: [true, "시작일을 입력해주세요."],
    validate: {
      validator: (date) => date,
      message: "시작일은 현재 시점보다 이후여야 합니다.",
    },
  },
  endAt: {
    type: Date,
    required: [true, "종료일을 입력해주세요."],
    validate: {
      validator: (date) => date,
      message: "종료일은 시작일보다 이후여야 합니다.",
    },
  },
  status: {
    type: String,
    required: [true, "투표 상태를 입력해주세요."],
    enum: {
      values: ["예정", "진행중", "종료", "취소됨"],
      message:
        "투표 상태는 다음 중 하나여야 합니다. (예정, 진행중, 종료, 취소됨)",
    },
  },
  options: {
    type: [OptionSchema],
    validate: {
      validator: (value) => value.length > 1,
      message: "투표 항목은 2개 이상이어야 합니다.",
    },
  },
});

const Voting = mongoose.model("Voting", VotingSchema);

module.exports = Voting;
