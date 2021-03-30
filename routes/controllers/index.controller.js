const Vote = require("../../model/Vote");

exports.getHome = async (req, res, next) => {
  const votes = (
    await Vote
      .find({})
      .populate("creator", { user_name: 1 })
      .lean()
  ).map(vote => {
    return {
      id: vote._id,
      title: vote.title,
      userName: vote.creator.user_name,
      expire: vote.expire_at,
      state: Date.parse(vote.expire_at) < Date.now() ? "종료" : "진행 중"
    };
  });

  const renderProps = {
    votes: await Promise.all(votes),
    isLogin: req.session.isLogin,
  };

  return res.render("index", renderProps);
};
