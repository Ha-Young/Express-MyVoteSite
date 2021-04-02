const datefns = require("date-fns");

const Vote = require("../model/Vote");

module.exports.getNewVote = function getNewVote(req, res, next) {
  const {
    user
  } = req;

  const messages = req.flash("info")[0];

  res.render("voteNew", { messages, user });
}

module.exports.postNewVote = async function postNewVote(req, res, next) {
  const {
    body: { voteTags, voteImageUrl, voteTitle, voteDueDate, voteDueDateTime, selectionTitle, selectionImage },
    user
  } = req;

  try {
    const inputDueDate = new Date(voteDueDate + "T" + voteDueDateTime + "Z");

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
    res.redirect("/error");
  }

  res.redirect("/success");
}

module.exports.getVoteDetail = async function getVoteDetail(req, res, next) {
  const {
    params: { vote_id },
    user
  } = req;

  const vote = await Vote.findById(vote_id).populate("creator").lean();
  vote.dueDate = datefns.format(vote.dueDate, "yyyy/M/d h:m:s");
  vote.isCreator = user && String(vote.creator._id) === String(user._id);

  res.render("voteDetail", { vote, user });
}

module.exports.putVoteDetail = async function putVoteDetail(req, res, next) {
  const {
    params: { vote_id },
    body: { chosenId },
    user
  } = req;

  try {
    const targetVote = await Vote.findById(vote_id).lean();

    targetVote.choices.forEach(choice => {
      choice.selectUser = choice.selectUser.filter(id => String(id) !== String(user._id));
    });

    const targetChoice = targetVote.choices.find(choice => String(choice._id) === chosenId);
    targetChoice.selectUser.push(user._id);

    await Vote.findOneAndUpdate({ _id: vote_id }, { $set: { choices: targetVote.choices }});

    res.json("success");
  } catch (err) {
    res.json("fail");
  }
}

module.exports.deleteVote = async function deleteVote(req, res, next) {
  const {
    params: { vote_id },
  } = req;

  try {
    await Vote.findByIdAndRemove(vote_id);

    res.send("success");
  } catch (err) {
    res.status(500).send("fail");
  }
}
