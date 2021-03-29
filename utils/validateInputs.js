const Joi = require('joi');

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
