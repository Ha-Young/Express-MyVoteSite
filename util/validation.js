const Joi = require("joi");

function validateLogIn(data) {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string()
      .min(10)
      .max(20)
      .required(),
  });
  
  return schema.validate({ ...data });
}

function validateSignUp(data) {
  const schema = Joi.object({
    name: Joi.string()
      .min(1)
      .max(20)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string()
      .min(10)
      .max(20)
      .regex(/^[ -~]+$/i)
      .required(),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("password")
      .messages({ "any.only": "{{#label}} does not match" }),
  });
  console.log({...data});
  return schema.validate({ ...data });
}

function validateVoting(votingInfo) {
  const { title, expired_at, options } = votingInfo;

  if (!title || !expired_at || !options) {
    return "Please enter every information";
  }

  if (options.length < 2) {
    return "Please enter options more then 2";
  }

  if (new Date(expired_at) < new Date()) {
    return "Please set expired date after now";
  }
}

exports.validateVoting = validateVoting;
exports.validateSignUp = validateSignUp;
exports.validateLogIn = validateLogIn;
