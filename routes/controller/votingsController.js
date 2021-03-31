const Voting = require("../../models/Voting");
const createError = require("http-errors");
const errorMessage = require("../../constants/errorMessage");
const { checkExpiredDate } = require("../../util/validation");

exports.renderVotingsPage = async function (req, res, next) {
  try {
    const votings = await Voting.find().lean();
    const userId = req.user._id;
    const userName = req.user.name;

    votings.forEach((voting) => {
      checkExpiredDate(voting);
    });
    const votingWithImg = insertRandomImage(votings);

    res.status(200).render("votings", { votingWithImg, userId, userName });
  } catch (error) {
    console.log(error);
    next(createError(500, errorMessage.SERVER_ERROR));
  }
};

exports.renderDetailPage = async function (req, res, next) {
  const userName = req.user.name;
  const userId = req.user._id;

  try {
    const voting = await Voting.findById(req.params.id)
      .populate("createdBy")
      .populate("voters");

    checkExpiredDate(voting);
    console.log("voting-------------", voting);

    const options = voting.options;
    console.log("options------------", options);

    res
      .status(200)
      .render("detailVoting", { voting, options, userName, userId });
  } catch (error) {
    console.log(error);
    next(createError(500, errorMessage.SERVER_ERROR));
  }
};

function insertRandomImage(array) {
  for (let i = 0; i < array.length / 4; i++) {
    const randomIndex = Math.floor(Math.random() * array.length);
    array.splice(randomIndex, 0, "img");
  }
  return array;
}
