const Voting = require("../../models/Voting");
const createError = require("http-errors");
const errorMessage = require("../../constants/errorMessage");

exports.renderVotingsPage = async function (req, res, next) {
  try {
    const votings = await Voting.find();
    const userId = req.user._id;
    const userName = req.user.name;

    const votingWithImg = insertRandomImage(votings);

    res.status(200).render("votings", { votingWithImg, userId, userName });
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
