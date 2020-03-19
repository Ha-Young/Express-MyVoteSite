const Vote = require("../../models/Vote");
const User = require("../../models/User");
const { RENDER_PROPS, MESSAGE } = require("./constant");
// const votes = [
//   { id: 1, title: "투표제목1", creator: "사용자1", due: "2020-03-20 3pm", state: "진행중" },
//   { id: 2, title: "투표제목2", creator: "사용자2", due: "2020-03-20 3pm", state: "진행중" },
//   { id: 3, title: "투표제목3", creator: "사용자3", due: "2020-03-20 3pm", state: "완료" }
// ];
async function createVote(req, res, next) {
  // vote db 에 추가합니다.
  const data = req.body;
  data.options = data.options.map(item => {
    return { option: item };
  });
  console.log(req.session.user._id);
  data.user = req.session.user._id;
  try {
    const newVote = await Vote.create(data);
    // 사용자의 vote 배열에도 추가해줍니다.
    const user = await User.findOne({ _id: req.session.user._id });
    const votes = user.votes;
    votes.push(newVote._id);
    user.votes = votes;
    const updateuser = await user.save();
  } catch (err) {
    next({ status: 500, message: MESSAGE.GET_ERROR });
  }
  res.json({ message: MESSAGE.CREATE_SUCCESS });
}

async function getAllVote(req, res, next) {
  const loginUser = req.session.userId;
  // 실제 투표에서 들고오기
  const votes = await Vote.find()
    .populate("user")
    .exec();
  votes.forEach(vote => {
    console.log(vote.due, typeof vote.due);
    const date = vote.due.toLocaleDateString();
    const time = vote.due.toTimeString().split(" ")[0];
    vote.due = date + time;
  });
  console.log(votes);
  // votes.toObeject();
  res.render("index", { title: RENDER_PROPS.TITLE, loginUser: loginUser, votes: votes });
}

async function getUserVote(req, res, next) {
  const loginUser = req.session.userId;
  // 실제 투표에서 들고오기
  console.log("loginUser:", loginUser);
  // 참여자에
  try {
    var vote = await Vote.find({ _id: req.params.id })
      .populate("user")
      .exec();
    var done = false;
    if (vote[0].participants.length) {
      done = vote[0].participants.contains(loginUser);
    }
  } catch (err) {
    res.render("error", { status: 500, message: MESSAGE.GET_ERROR });
  }
  res.render("vote", {
    loginUser: loginUser,
    style: RENDER_PROPS.STYLE.VOTE,
    vote: vote[0],
    done
  });
}

async function updateVoteCount(req, res, next) {
  console.log("투표결과를 반영합니다");
  var vote = await Vote.findOne({ _id: req.params.id });
  console.log(vote);
  console.log(req.body.optionId);
  vote.options[req.body.optionId].count++;
  console.log(vote.options);
  const voteUpdated = await vote.save();
  console.log(voteUpdated);
}
module.exports = { createVote, getAllVote, getUserVote, updateVoteCount };
