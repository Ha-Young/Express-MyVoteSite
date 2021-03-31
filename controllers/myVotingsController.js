const Vote = require("../models/Vote");
const jwt = require("jsonwebtoken");

exports.getMyVotes = async (req, res) => {
  const token = req.cookies["access_token"];
  const { id } = jwt.verify(token, process.env.JWT_SECRETKEY);
  const currentDate = new Date();

  const myVoteList = await Vote.aggregate([{
    $match: { "creator": id }
  }]);

  res.render("myVotes", { myVoteList });
};
