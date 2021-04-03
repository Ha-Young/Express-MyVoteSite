const { Joi } = require("celebrate");
const mongoose = require("mongoose");
const joigoose = require("joigoose")(mongoose);

Joi.objectId = require("joi-objectid")(Joi);

const joiUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string(),
  salt: Joi.string(),
  name: Joi.string().required(),
  provider: Joi.string(),
  isAdmin: Joi.boolean(),
  my_votes: Joi.array().items(Joi.objectId),
  voted_votes: Joi.array().items(Joi.objectId),
});

const UserSchema = new mongoose.Schema(joigoose.convert(joiUserSchema), { timestamps: true });

UserSchema.pre("save", function (next) {
  const user = this;
  try {
    user.isAdmin = false;
    user.my_votes = [];
    user.voted_votes = [];

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", UserSchema);
