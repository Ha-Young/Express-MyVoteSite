const datefns = require("date-fns");
const Vote = require("../model/Vote");

module.exports.getNewVote = function getNewVote(req, res, next) {
  const {
    user
  } = req;

  const aa = req.flash("info")[0];
  res.render("voteNew", { messages: aa, user });
}

module.exports.postNewVote = async function postNewVote(req, res, next) {
  const {
    body: { voteTags, voteImageUrl, voteTitle, voteDueDate, voteDueDateTime, selectionTitle, selectionImage },
    user
  } = req;

  console.log(user.email);

  try {
    const inputDueDate = new Date(voteDueDate + "T" + voteDueDateTime + "Z");

    console.log(inputDueDate < new Date());
    if (inputDueDate < new Date()) {
      throw new Error("Due date or time MUST be future than current time");
    }

    if (selectionTitle.length < 2) {
      throw new Error("need Selections at least 2 more");
    }

    const choices = Array(selectionTitle.length).fill("").map((_, i) => ({
      choiceTitle: selectionTitle[i],
      selectUser: [],
      pictureURL: selectionImage[i] || undefined,
    }));

    const tags = voteTags && voteTags.split(",").map(el => el.trim());

    await Vote.create({
      title: voteTitle,
      createAt: new Date(Date.now()),
      dueDate: inputDueDate,
      isEnable: true,
      creator: user._id,
      thumbnailURL: voteImageUrl || undefined,
      choices,
      tags,
    });
  } catch (err) {
    req.flash("info", err.message);
    res.redirect("/votings/new");
  }

  res.redirect("/");
}

module.exports.getVoteDetail = async function getVoteDetail(req, res, next) {
  const {
    params: { vote_id },
    user
  } = req;

  const vote = await Vote.findById(vote_id).populate("creator").lean();
  console.log(vote.dueDate);
  vote.dueDate = datefns.format(vote.dueDate, "yyyy/M/d h:m:s");
  console.log(vote.dueDate);

  res.render("voteDetail", { vote, user });
}

module.exports.putVoteDetail = async function putVoteDetail(req, res, next) {
  const {
    params: { vote_id },
    body,
    user
  } = req;

  console.log("put server : ", vote_id, body);
}
