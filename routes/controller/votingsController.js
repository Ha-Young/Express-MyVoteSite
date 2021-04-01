const Voting = require("../../models/Voting");
const dotenv = require("dotenv");
const createError = require("http-errors");
const errorMessage = require("../../constants/errorMessage");
const jwt = require("jsonwebtoken");
const {
  checkExpiredDate,
  checkCreator,
  checkVoter,
} = require("../../util/validation");
dotenv.config();

exports.renderVotingsPage = async function (req, res, next) {
  try {
    const votings = await Voting.find().lean();
    const userProfile = checkLogIn(req.cookies["jwt"]);

    votings.forEach((voting) => {
      checkExpiredDate(voting);
    });
    const votingWithRandomColor = insertRandomColorClass(votings);
    const votingWithImg = insertRandomImage(votingWithRandomColor);

    res.status(200).render("votings", {
      votingWithImg,
      userId: userProfile.userId,
      userName: userProfile.userName,
    });
  } catch (error) {
    console.log(error);
    next(createError(500, errorMessage.SERVER_ERROR));
  }
};

exports.updateVotingOption = async function (req, res, next) {
  try {
    const { votingId, optionName, voterId } = req.body;

    const voting = await Voting.findOneAndUpdate(
      {
        _id: votingId,
        options: { $elemMatch: { name: optionName } },
      },
      {
        $inc: {
          "options.$.voteCount": +1,
        },
      }
    );

    await voting.voters.push(voterId);
    await voting.save();

    res.status(204).send();
  } catch (error) {
    console.log(error);
    next(createError(500, errorMessage.SERVER_ERROR));
  }
};

exports.renderDetailPage = async function (req, res, next) {
  try {
    const voting = await Voting.findById(req.params.id).lean();
    const userProfile = checkLogIn(req.cookies["jwt"]);
    console.log("userProfile in detail", userProfile);

    checkExpiredDate(voting);
    const isCreator = checkCreator(userProfile.userId, voting.createdBy);
    const didVote = checkVoter(voting.voters, userProfile.userId);
    const options = voting.options;
    console.log("is creator?", isCreator);
    console.log("did vote?", didVote);
    console.log("voting-------------", voting);
    console.log("options------------", options);

    res.status(200).render("detailVoting", {
      voting,
      options,
      didVote,
      isCreator,
      userId: userProfile.userId,
      userName: userProfile.userName,
    });
  } catch (error) {
    console.log(error);
    next(createError(500, errorMessage.SERVER_ERROR));
  }
};

function checkLogIn(token) {
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      return { userId: decoded._id, userName: decoded.name };
    } catch (error) {
      console.log(error);
    }
  } else {
    return { userId: null, userName: null };
  }
}

function insertRandomImage(array) {
  for (let i = 0; i < array.length / 4; i++) {
    const randomIndex = Math.floor(Math.random() * array.length);
    array.splice(randomIndex, 0, "img");
  }
  return array;
}

function insertRandomColorClass(votings) {
  const color = [
    "green",
    "beige",
    "beige",
    "beige",
    "beige",
    "skyblue",
    "pink",
    "pink",
    "pink",
    "sage",
  ];
  votings.forEach((voting) => {
    voting.colorClass = color[Math.floor(Math.random() * color.length)];
  });

  return votings;
}
