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
        voters: {},
        expirationTime:
          toBeCreatedVoting.expirationTime,
        options:
          toBeCreatedVoting.options.reduce((acc, option) => {
            acc.set(option, 0);
            return acc;
          }, new Map()),
        isAbleSelectMultipleOptions:
          toBeCreatedVoting.isAbleSelectMultipleOptions,
        imageUrl:
          toBeCreatedVoting.imageUrl,
        postingTime: new Date(),
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
    const votingId = req.params.voting_id;
    const currentVoting =
      await Voting.findById(votingId)
        .populate("publisher", "name email");

    if (!currentVoting) {
      next(createError(404, "Can't find the voting"));
      return;
    }

    const userEmail = res.locals.userEmail;
    const isPublisher = currentVoting.publisher.email === userEmail;

    console.log("isPublisher", isPublisher);

    const expirationTime = format(currentVoting.expirationTime, "yyyy-MM-dd HH:mm");
    const isExpired = currentVoting.expirationTime - new Date() < 0;
    let currentState = "activated";
    if (isExpired) {
      currentState = "expired";
    }

    const options = Object.fromEntries(currentVoting.options);

    const isAlreadyVoted = !!currentVoting.voters[userEmail];
    console.log("isAlreadyVoted", isAlreadyVoted);

    res.status(200).render("voting", {
      voting: currentVoting,
      options,
      expirationTime,
      currentState,
      isPublisher,
      user: userEmail,
      isAlreadyVoted,
    });
  } catch (err) {
    next(createError(500, err.message));
  }
};

module.exports.putVoting = async (req, res, next) => {
  try {
    const votingId = req.params.voting_id;
    const currentVoting =
      await Voting.findById(votingId);

    if (!currentVoting) {
      next(createError(400, err.message));
      return;
    }

    const selectedOptions = req.body;
    const userEmail = res.locals.userEmail;
    console.log("selectedOptions" ,selectedOptions);
    console.log("user", userEmail);

    const isAlreadyVoted = !!currentVoting.voters[userEmail];
    if (isAlreadyVoted) {
      next(createError(400, err.message));
      return;
    }

    currentVoting.voters = { ...currentVoting.voters, [userEmail]: true };

    for (const option of selectedOptions) {
      currentVoting.options.set(
        option,
        currentVoting.options.get(option) + 1
      );
    }

    await currentVoting.save();

    res.status(201).json({ result: true });
  } catch (err) {
    next(createError(500, err.message));
  }
};

module.exports.deleteVoting = async (req, res, next) => {
  try {
    const votingId = req.params.voting_id;
    const currentVoting =
      await Voting.findById(votingId)
        .populate("publisher", "name email");

    const userEmail = res.locals.userEmail;
    const isPublisher = currentVoting.publisher.email === userEmail;

    if (!isPublisher) {
      next(createError(403, err.message));
      return;
    }

    await currentVoting.deleteOne();

    res.status(201).end();
  } catch (err) {
    next(createError(500, err.message));
  }
};
