const { Joi } = require("celebrate");
const mongoose = require("mongoose");
const joigoose = require("joigoose")(mongoose);

const joiUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string(),
  salt: Joi.string(),
  name: Joi.string().required(),
  provider: Joi.string(),
  isAdmin: Joi.boolean(),
});

const UserSchema = new mongoose.Schema(joigoose.convert(joiUserSchema));

UserSchema.pre("save", function (next) {
  const user = this;
  try {
    user.isAdmin = false;

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", UserSchema);
