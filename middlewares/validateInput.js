const Joi = require('joi');
const createError = require('http-errors');

exports.signupSchema = function (req, res, next) {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .error(new Error("email is invalid")),
    name: Joi.string()
      .alphanum()
      .required()
      .error(new Error("nickname is invalid")),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])"))
      .required()
      .error(new Error("password is invalid")),
    passwordCheck: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .error(new Error("password confirm is not same as password")),
  });

  validateRequest(req, res, next, schema);
};
// .error((errors) => {
//   return errors.map(error => {
//     switch (error.type) {
//       case "string.min":
//         return { message: "first msg" };
//       case "string.max":
//         return { message: "second msg" };
//       case "any.empty":
//         return { message: "third msg" };
//     }
//   })
// )
exports.loginSchema = function (req, res, next) {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .error(new Error("email is invalid")),
    password: Joi.string()
      .min(8)
      .required()
      .error(new Error("password is invalid")),
  });

  validateRequest(req, res, next, schema);
};

exports.createVotingSchema = function (req, res, next) {
  const schema = Joi.object({
    title: Joi.string()
      .required()
      .error(new Error("title is invalid")),
    userOptions: Joi.array()
      .required()
      .error(new Error("vote options must be more than two")),
    expiration_date: Joi.date()
      .greater('now')
      .required()
      .error(new Error("expiration date must be later than now")),
  });

  validateRequest(req, res, next, schema);
};

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
    // flash쓰면 뭐가 뭔지 어떻게 알지?? 지금은 그냥 텍스트만 들어가는데..
    // 사실 에러낼건 아님.. 찐 에러는 아니고 걸린거니까!!
    next(createError(400, err));
  }
}
