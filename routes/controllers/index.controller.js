const Vote = require("../../model/Vote");

exports.getHome = async (req, res, next) => {
  const votes = (
    await Vote
      .find({})
      .populate("creator", { user_name: 1 })
      .lean()
  ).map(vote => {
    const expireDate = new Date(vote.expire_at);
    const dates = {
      year: expireDate.getFullYear(),
      month: expireDate.getMonth() + 1,
      date: expireDate.getDate(),
      hours: expireDate.getHours(),
      minutes: expireDate.getMinutes(),
    };

    return {
      id: vote._id,
      title: vote.title,
      userName: vote.creator.user_name,
      dates,
      expire: vote.expire_at,
      state: Date.parse(vote.expire_at) < Date.now() ? "종료" : "진행 중"
    };
  }).sort((a, b) =>  Date.parse(b.expire) - Date.parse(a.expire));

  return res.render("index", { votes });
};

exports.getProgressVotesList = async (req, res, next) => {
  const votes = [];

  (await Vote
    .find({})
    .populate("creator", { user_name: 1 })
    .lean()
  ).forEach(vote => {
    const state = Date.parse(vote.expire_at) < Date.now() ? "종료" : "진행 중";

    if (state === "종료") return;

    const expireDate = new Date(vote.expire_at);
    const dates = {
      year: expireDate.getFullYear(),
      month: expireDate.getMonth() + 1,
      date: expireDate.getDate(),
      hours: expireDate.getHours(),
      minutes: expireDate.getMinutes(),
    };

    votes.push({
      id: vote._id,
      title: vote.title,
      userName: vote.creator.user_name,
      dates,
      expire: vote.expire_at,
      state,
    });
  });
  votes.sort((a, b) =>  Date.parse(b.expire) - Date.parse(a.expire));

  return res.render("index", { votes });
}

exports.getCloseVotesList = async (req, res, next) => {
  const votes = [];

  (await Vote
    .find({})
    .populate("creator", { user_name: 1 })
    .lean()
  ).forEach(vote => {
    const state = Date.parse(vote.expire_at) < Date.now() ? "종료" : "진행 중";

    if (state === "진행 중") return;

    const expireDate = new Date(vote.expire_at);
    const dates = {
      year: expireDate.getFullYear(),
      month: expireDate.getMonth() + 1,
      date: expireDate.getDate(),
      hours: expireDate.getHours(),
      minutes: expireDate.getMinutes(),
    };

    votes.push({
      id: vote._id,
      title: vote.title,
      userName: vote.creator.user_name,
      dates,
      expire: vote.expire_at,
      state,
    });
  });
  votes.sort((a, b) =>  Date.parse(b.expire) - Date.parse(a.expire));

  return res.render("index", { votes });
}
