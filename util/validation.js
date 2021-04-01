const Joi = require("joi");

const validateRegisterForm = (requestedBody) => {
  console.log(requestedBody);
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    passwordConfirmation: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Password")
      .messages({ "any.only": "{{#label}} does not match" }),
  });

  return schema.validate(requestedBody, { abortEarly: false });
};

const validateLoginForm = (requestedBody) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(requestedBody, { abortEarly: false });
};

const validateVoteForm = (requestedBody) => {
  const schema = Joi.object({
    voteName: Joi.string().required().min(1),
    creator: Joi.string().required(),
    expireDate: Joi.date(),
    // expireDate: Joi.date().greater("now"),
    options: Joi.array().min(3),
  });

  return schema.validate(requestedBody, { abortEarly: false });
};

/**
 * validate voting expire date
 * @param {Array} votings - array fetched from db.
 */
const validateVotingDate = (votings) => {
  votings.forEach((voting) => {
    if (voting.expireDate < getToday()) {
      return (voting.isCanceled = true);
    }
    voting.isExpired = false;
  });

  return votings;
};

const checkExpiredDate = (voting) => {
  if (voting.expireDate < getToday()) {
    return (voting.isExpired = true);
  }
  return (voting.isExpired = false);
};

const checkCreator = (userId, creatorId) => {
  console.log("id check------------", userId, creatorId);
  console.log("id check------------", userId === creatorId);
  if (userId === creatorId.toString()) {
    return true;
  }
  return false;
};

/**
 * check voters
 * @param {Array} voters - array fetched from db.
 */
const checkVoter = (voters, userId) => {
  return voters.some((voterId) => voterId.toString() === userId);
};

const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

module.exports.validateRegisterForm = validateRegisterForm;
module.exports.validateLoginForm = validateLoginForm;
module.exports.validateVoteForm = validateVoteForm;

module.exports.validateVotingDate = validateVotingDate;
module.exports.checkExpiredDate = checkExpiredDate;
module.exports.checkCreator = checkCreator;
module.exports.checkVoter = checkVoter;
