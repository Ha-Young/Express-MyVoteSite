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
    expireDate: Joi.date().greater("now"),
    options: Joi.array().min(3),
  });

  return schema.validate(requestedBody, { abortEarly: false });
};

module.exports.validateRegisterForm = validateRegisterForm;
module.exports.validateLoginForm = validateLoginForm;
module.exports.validateVoteForm = validateVoteForm;
