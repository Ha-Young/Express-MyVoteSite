const Vote = require("../../models/Vote");

exports.getAll = async function (req, res, next) {
  try {
    const votes = await Vote.find();
    res.status(200);
    res.render("index", { votes });
  } catch (err) {
    next(err);
  }
};
