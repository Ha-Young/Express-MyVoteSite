const Voting = require("../../models/Voting");
const createError = require("http-errors");
const { format, parseISO } = require("date-fns");
const {
  INTERNAL_SERVER_ERROR,
  INVALID_VOTING_ID_ERROR,
  BEFORE_CURRENT_DATE_ERROR,
} = require("../../constants/errorMessage");
const { checkExpiryDate } = require("../../utils/checkExpiryDate");

exports.getAll = async (req, res, next) => {
  await Voting.find()
    .exec((err, votings) => {
      try {
        votings.forEach((voting) => {
          const isBeforeCurrentDate = checkExpiryDate(voting);

          if (isBeforeCurrentDate) {
            voting.isInProgress = false;
          }

          voting.save();
        });

        res.render("index", { votings });
      } catch (err) {
        return next(createError(500, INTERNAL_SERVER_ERROR));
      }
    });
};

exports.create = async (req, res, next) => {
  try {
    const { title, expiryDate, options } = req.body;
    const { email } = req.user;

    const isBeforeCurrentDate = checkExpiryDate(expiryDate);
    const convertedExpiryDate = format(parseISO(expiryDate), "yyyy-MM-dd hh:mm:ss");

    if (isBeforeCurrentDate) {
      return next(createError(400, BEFORE_CURRENT_DATE_ERROR));
    }

    const votingOptions = options.map((option) => {
      return { option }
    });

    await new Voting({
      title,
      expiryDate: convertedExpiryDate,
      generator: email,
      options: votingOptions,
    }).save();

    return res.redirect("/");
  } catch (err) {
    return next(createError(500, err, INTERNAL_SERVER_ERROR));
  }
};

exports.getVotingDetails = async (req, res, next) => {
  const { voting_id: votingId } = req.params;

  await Voting.findById(votingId)
    .exec((err, voting) => {
      try {
        res.render("votingDetails", { voting });
      } catch (err) {
        return next(createError(400, INVALID_VOTING_ID_ERROR));
      }
    });
};
