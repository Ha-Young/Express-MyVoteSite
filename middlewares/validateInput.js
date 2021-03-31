const Joi = require('joi');
const createError = require('http-errors');

exports.signupSchema = function (req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().min(8).required(),
    passwordCheck: Joi.string().valid(Joi.ref('password')).required(),
  });

  validateRequest(req, res, next, schema);
}

exports.createVotingSchema = function (req, res, next) {
  const schema = Joi.object({
    title: Joi.string().required(),
    userOptions: Joi.array().required(),
    expiration_date: Joi.date().greater('now').required()
  });

  validateRequest(req, res, next, schema);
}

async function validateRequest(req, res, next, schema) {
  const options = {
      abortEarly: true,
      allowUnknown: true
  };

  try {
    await schema.validateAsync(req.body, options);

    next();
  } catch (err) {
    // TODO 여기서 원래 path로 redirect하는데 데이터도 갖고 있어야함. 어? 이러면 flash써야할거같은데...
    next(createError(400, `Validation error: ${err.details[0].message}`));
  }
}
