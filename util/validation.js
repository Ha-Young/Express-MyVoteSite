const Joi = require("joi");

exports.validateLogIn = (data) => {
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
};

exports.validateSignUp = (data) => {
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
  
  return schema.validate({ ...data });
};

exports.validateVoting = (data) => {
  const schema = Joi.object({
    title: Joi.string()
      .required(),
    expired_at: Joi.date()
      .greater("now")
      .required(),
    options: Joi.array()
      .min(2)
      .items(Joi.string())
  });
  
  return schema.validate({ ...data });
};
