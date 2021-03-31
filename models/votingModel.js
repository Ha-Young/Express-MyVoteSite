const mongoose = require("mongoose");
const { Schema } = mongoose;
const {
  Types: { ObjectId, Mixed },
} = Schema;

const OptionSchema = new Schema({
  _id: false,
  option: {
    type: Mixed,
    required: true,
  },
  votee: {
    type: [ObjectId],
    ref: "User",
    default: [],
  },
});

const VotingSchema = new Schema({
  name: {
    type: String,
    required: [true, "투표 제목을 입력하세요."],
    maxlength: [40, "투표 제목은 2글자에서 40글자 이내 여야 합니다."],
    minlength: [2, "투표 제목은 2글자에서 40글자 이내 여야 합니다."],
  },
  createdBy: {
    type: ObjectId,
    ref: "User",
    required: [true, "투표 생성자가 필요합니다."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDate: {
    type: Date,
    required: [true, "시작시점을 입력해주세요."],
  },
  endDate: {
    type: Date,
    required: [true, "종료시점을 입력해주세요."],
    validate: {
      validator: function(date) {
        return date > this.startDate;
      },
      message: "종료시점은 시작시점보다 이후여야 합니다.",
    },
  },
  status: {
    type: String,
    enum: {
      values: ["예정", "진행중", "종료", "취소됨"],
      message:
        "투표 상태는 다음 중 하나여야 합니다. (예정, 진행중, 종료, 취소됨)",
    },
  },
  options: {
    type: [OptionSchema],
    validate: {
      validator: function(value) {
        return value.length > 1;
      },
      message: "투표 항목은 2개 이상이어야 합니다.",
    },
  },
});

VotingSchema.pre("save", (next) => {
  console.log(this.startDate);
  console.log(this.endDate);

  next();
});

const Voting = mongoose.model("Voting", VotingSchema);

module.exports = Voting;
