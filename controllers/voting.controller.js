const Voting = require("../models/Voting");
const User = require("../models/User");
const validateVotingData = require("../utils/validateVotingData");

module.exports.newGet = async (req, res, next) => {
  res.status(200).render("createVoting");
};

module.exports.newPost = async (req, res, next) => {
  try {
    const writer = await User.findOne({ email: res.locals.userEmail }).lean();
    const toBeCreatedVoting = req.body;
    console.log(toBeCreatedVoting);
    console.log(writer);
    console.log("date",(toBeCreatedVoting.expirationTime));

    const validationResult = validateVotingData(toBeCreatedVoting);
    if (validationResult.result) {
      const newVoting = new Voting({
        title: toBeCreatedVoting.title,
        description: toBeCreatedVoting.description,
        writer: writer._id,
        voter: [],
        expirationTime:
          toBeCreatedVoting.expirationTime,
        options:
          toBeCreatedVoting.options.map(
            (option) => ({ name: option, count: 0 })
          ),
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
