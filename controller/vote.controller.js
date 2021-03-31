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
      pictureURL: selectionImage[i],
    }));

    const tags = voteTags && voteTags.split(",").map(el => el.trim());

    await Vote.create({
      title: voteTitle,
      createAt: new Date(Date.now()),
      dueDate: inputDueDate,
      isEnable: true,
      creator: user._id,
      thumbnailURL: voteImageUrl,
      choices,
      tags,
    });
  } catch (err) {
    req.flash("info", err.message);
    res.redirect("/votings/new");
  }

  
}
