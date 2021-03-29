const Vote = require("../../models/Vote");

exports.renderIndexPage = async (req, res, next) => {
  const votes = await Vote.find().lean();

  res.locals.votes = votes;
  res.render("index");
};
