const Joi = require('joi');
/**
 * validate inputs by joi schema
 * @param {object} data - object
 * @returns {[object|object]} [error, value] if data doesn't match to schem error has value
 */
exports.validateLoginInputs = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
  });

  return schema.validate(data);
};

exports.validateSignUpInputs = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    nickname: Joi.string().min(2).max(15).required(),
    password: Joi.string().min(8).max(20).required(),
    password_confirmation: Joi.any().equal(Joi.ref('password'))
      .required()
      .label('confirm password')
      .options({ messages: { 'any.only': '{{#label}} does not match to password' } })
  });

  return schema.validate(data, { abortEarly: false });
};

exports.validateQueries = (query) => {
  const schema = Joi.object().keys({
    sort: Joi.string(),
    fields: Joi.string(),
    page: Joi.string(),
    limit: Joi.string(),
    docs: Joi.string(),
    options: Joi.string()
  });

  return schema.validate(query);
};

exports.validateNewVoteInputs = (data) => {
  const schema = Joi.object().keys({

  });

  return schema.validate(data);
};

exports.validateVoteInputs = (data) => {
  const schema = Joi.object().keys({

  });

  return schema.validate(data);
};
