const Vote = require("../model/Vote");

module.exports.getNewVote = function getNewVote(req, res, next) {
  res.render("voteNew");
}

module.exports.postNewVote = async function postNewVote(req, res, next) {
  const {
    body: { voteImageUrl, voteTitle, voteDueDate, voteDueDateTime, selectionTitle, selectionImage },
    user
  } = req;

  // 검증해야 할 것들...
  // title이 있을 것 => mongoose
  // due date가 있을 것 => mongoose
  // selection이 최소 2개 이상 있을 것 => mongoose?

  const inputDueDate = new Date(voteDueDate + "T" + voteDueDateTime + "Z");

  if (inputDueDate > new Date()) {
    // Due date가 현재보다 미래일 것
    
  }

  try {
    await Vote.create({
      title: voteTitle,

      createAt: new Date(Date.now()),
      dueDate: new Date(voteDueDate + voteDueDateTime),
    });
  } catch (err) {
    console.log("catched Error!!!! : ", err.errors.title.message);
  }
}
