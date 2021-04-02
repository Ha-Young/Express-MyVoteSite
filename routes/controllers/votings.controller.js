const createError = require("http-errors");

const Vote = require("../../model/Vote");
const User = require("../../model/User");

exports.getNewVoteForm = (req, res, next) => {
  if (!req.session.userId) return res.redirect("/login");

  return res.render("newVoteForm");
}

exports.createVote = async (req, res, next) => {
  const title = req.body.title;
  const creator = req.session.userId;
  const options = req.body.option.map(option => {
    return {
      title: option,
      voters: [],
    };
  });
  const { year, month, date, hours, minutes } = req.body;
  const expire_at = new Date(
    Number(year),
    Number(month) - 1,
    Number(date),
    Number(hours),
    Number(minutes),
  ).toISOString();

  const newVoteDoc = new Vote({
    title,
    creator,
    options,
    expire_at,
  });
  await newVoteDoc.save();
  const voteCreatorDoc = await User.findById(creator);
  voteCreatorDoc.votings.push({
    voteId: newVoteDoc._id,
    isCreator: true,
  });
  voteCreatorDoc.save();
  return res.send("success");
};

exports.getSuccess = (req, res, next) => {
  res.render("successVote");
};

exports.getError = (req, res, next) => {
  res.render("errorVote");
};

exports.getVote = async (req, res, next) => {
  const { id: voteId } = req.params;
  if (voteId === "new" || voteId === "success" || voteId === "error") {
    return next();
  }

  const vote = await Vote
    .findById(voteId)
    .populate("creator", { user_name: 1 })
    .lean();

  if (!vote) return next();

  const options = vote.options.map(option => {

    return {
      id: option._id.toString(),
      title: option.title,
      numberOfVoters: option.voters.length,
    };
  });

  const creatorId = vote.creator._id.toString();
  let isCreator = null;
  let voterName = null;

  if (req.session.userId) {
    isCreator = req.session.userId.toString() === creatorId;
    voterName = (await User.findById(req.session.userId, ["user_name"]).lean()).user_name;
  }

  const expireDate = new Date(vote.expire_at);
  const dates = {
    year: expireDate.getFullYear(),
    month: expireDate.getMonth() + 1,
    date: expireDate.getDate(),
    hours: expireDate.getHours(),
    minutes: expireDate.getMinutes(),
  };

  const renderProps = {
    voterName,
    isCreator,
    vote: {
      id: vote._id.toString(),
      title: vote.title,
      isExpired: Date.parse(vote.expire_at) < Date.now() ? true : false,
      dates,
      expireAt: vote.expire_at,
      allVotingNum: options.reduce(
        (sum, option) => sum + option.numberOfVoters,
        0,
      ),
    },
    creator: {
      id: creatorId,
      name: vote.creator.user_name,
    },
    options,
  };

  res.render("votings", renderProps);
};

exports.patchVote = async (req, res, next) => {
  const voteId = req.params.id;
  const voterId = req.session.userId;
  const voterOptionIds = req.body;

  const voterDoc = await User.findById(voterId);
  const hasVoted = voterDoc.votings
    .some(voting => {
      return voting.voteId.toString() === voteId && voting.optionId
    });

  if (hasVoted) {
    return res.json({ result: "fail", message: "이미 투표하셨어요 😰" });
  }

  const voteDoc = await Vote.findById(voteId);

  if (!voteDoc) {
    return res.json({ result: "cancel", message: "투표가 취소됐어요 😓" });
  }

  voterOptionIds.forEach(optId => {
    for (const option of voteDoc.options) {
      if (option._id.toString() === optId) {
        option.voters.push(optId);
      }
    }

    let isAddedOptId = false;

    for (const voting of voterDoc.votings) {
      if (voting.voteId.toString() === voteId) {
        voting.optionId = optId;
        isAddedOptId = true;
        break;
      }
    }

    if (!isAddedOptId) voterDoc.votings.push({ voteId, optionId: optId });
  });

  try {

    await voteDoc.save();
    await voterDoc.save();
    return res.json({ result: "success", message: "투표 성공! 🥳"});
  } catch (error) {
    console.error(error);
    return next(createError(500, error));
  }
  // voterOptionIds.forEach(async voterOptId => {
  //   const isSaved = voteDoc.options.some((option, index) => {
  //     if (option._id.toString() === voterOptId) {
  //       voteDoc.options[index].voters.push(voterId);
  //       voteDoc.save();
  //       for (let i = 0; i < voterDoc.votings.length; i++) {
  //         const votedId = voterDoc.votings[i].voteId.toString();
  //         if ( votedId === voteId) {
  //           debugger;
  //           voterDoc.votings[i] =  { ...voterDoc.votings[i], optionId: option._id };
  //           voterDoc.save();
  //           return true;
  //         }
  //       }
  //     }
  //   });

  //   if (!isSaved) {
  //     voterDoc.votings.push({ voteId, optionId: option._id });
  //     voterDoc.save();
  //   }
  // });

  // return res.json({ result: "success", message: "투표 성공! 🥳"});
}

exports.deleteVote = async (req, res, next) => {
  const { id: voteId } = req.params;
  try {
    await Vote.findByIdAndDelete(voteId);

    return res.send(`${voteId} is deleted.`);
  } catch (error) {
    console.error(error);
    next(createError(500, error));
  }
};



