const Joi = require('joi');
const createError = require('http-errors');

exports.signupSchema = function (req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().min(8).required(),
    passwordCheck: Joi.string().valid(Joi.ref('password')).required(),
  });

  validateRequest(req, next, schema);
}

exports.createVotingSchema = function (req, res, next) {
  const schema = Joi.object({
    title: Joi.string().required(),
    options: Joi.array().required(),
    expiration_date: Joi.string().required()
  });

  validateRequest(req, next, schema);
}

async function validateRequest(req, next, schema) {
  const options = {
      abortEarly: true,
      allowUnknown: true,
  };

  try {
    await schema.validateAsync(req.body, options);

    next();
  } catch (err) {
    next(createError(400, `Validation error: ${err.details[0].message}`));
  }
}
