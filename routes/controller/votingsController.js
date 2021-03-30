const Voting = require("../../models/Voting");
const createError = require("http-errors");
const errorMessage = require("../../constants/errorMessage");

exports.renderVotingsPage = async function (req, res, next) {
  try {
    const votings = await Voting.find();
    console.log("-----------------------------------------");
    // console.log(votings);

    const votingWithImg = insertRandomImage(votings);
    console.log(votingWithImg);

    res.status(200).render("votings", { votingWithImg });
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
