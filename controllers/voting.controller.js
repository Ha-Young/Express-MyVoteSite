const createError = require("http-errors");
const { format } = require("date-fns");

const Voting = require("../models/Voting");
const User = require("../models/User");
const validateVotingData = require("../utils/validateVotingData");

module.exports.getNew = async (req, res, next) => {
  res.status(200).render("createVoting");
};

module.exports.postNew = async (req, res, next) => {
  try {
    const publisher = await User.findOne({ email: res.locals.userEmail }).lean();
    const toBeCreatedVoting = req.body;
    console.log("new voting\n", toBeCreatedVoting);

    const validationResult = validateVotingData(toBeCreatedVoting);
    if (validationResult.result) {
      const newVoting = new Voting({
        title: toBeCreatedVoting.title,
        description: toBeCreatedVoting.description,
        publisher: publisher._id,
        voter: {},
        expirationTime:
          toBeCreatedVoting.expirationTime,
        options:
          toBeCreatedVoting.options.reduce((acc, option) => {
            acc.set(option, 0);
            return acc;
          }, new Map()),
        isAbleSelectMultipleOptions:
          toBeCreatedVoting.isAbleSelectMultipleOptions,
      });

      await newVoting.save();

      res.status(201).json(validationResult);
    } else {
      res.status(422).json(validationResult);
    }
  } catch (err) {
    console.log(err);
    next(createError(500, err.message));
  }
};

module.exports.getVoting = async (req, res, next) => {
  try {
    const currentVoting =
      await Voting.findById(req.params.voting_id)
        .populate("publisher", "name email")

    if (!currentVoting) {
      next(createError(404, "Can't find the voting"));
      return;
    }

    let isPublisher = false;
    const userEmail = res.locals.userEmail
    if (currentVoting.publisher.email === userEmail) {
      isPublisher = true;
    }

    console.log(currentVoting);
    console.log("isPublisher", isPublisher);

    const expirationTime = format(currentVoting.expirationTime, "yyyy-MM-dd HH:mm");
    const isExpired = currentVoting.expirationTime - new Date() < 0;
    let currentState = "activated";
    if (isExpired) {
      currentState = "expired";
    }

    const options = Object.fromEntries(currentVoting.options);

    const isVoted = !!currentVoting.voter[userEmail];

    res.status(200).render("voting", {
      voting: currentVoting,
      options,
      expirationTime,
      currentState,
      isPublisher,
      user: userEmail,
    });
  } catch (err) {
    next(createError(500, err.message));
  }
};

module.exports.postVoting = async (req, res, next) => {
  console.log(req.body);
};
