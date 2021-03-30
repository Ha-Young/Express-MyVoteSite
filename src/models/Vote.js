const { Joi } = require("celebrate");
const mongoose = require("mongoose");
const joigoose = require("joigoose")(mongoose);

Joi.objectId = require('joi-objectid')(Joi);

const joiVoteOptionSchema = Joi.object.keys({
  title: Joi.string().required(),
  count: Joi.number(),
});

const joiVoteSchema = Joi.object({
  title: Joi.string().required(),
  creator: Joi.objectId().required(),
  expire_datetime: Joi.date().required(),
  is_process: Joi.boolean(),
  vote_options: Joi.array().items(joiVoteOptionSchema).required(),
  entire_count: Joi.number().required(),
});

const VoteSchema = new mongoose.Schema(joigoose.convert(joiVoteSchema));

module.exports = mongoose.model("Vote", VoteSchema);
