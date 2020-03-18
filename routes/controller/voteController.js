const Vote = require("../../models/Vote");

async function createVote(req, res, next) {
  // vote db 에 추가합니다.
  const data = req.body;
  data.options = data.options.map(item => {
    return { option: item };
  });
  console.log(req.session.user._id);
  data.user = req.session.user._id;

  const newVote=Vote.create(data);
  // 사용자의 vote 배열에 vote id 추가
  //성공
  //실패
}
async function readAllVote(req, res, next) {
  res.end("vote를 모두 불러옵니다");
}
async function readUserVote(req, res, next) {
  res.end("사용자의 vote를 모두 불러옵니다");
}

async function updateVote(req, res, next) {
  res.end("vote를 업데이트합니다");
}

async function deleteVote(req, res, next) {
  res.end("vote를 삭제합니다");
}

module.exports = { createVote, updateVote, readAllVote, readUserVote, deleteVote };
