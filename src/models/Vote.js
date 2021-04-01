const { Joi } = require("celebrate");
const { format, isPast } = require("date-fns");
const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const joigoose = require("joigoose")(mongoose);

const { dateFormat } = require("../config");

Joi.objectId = require("joi-objectid")(Joi);

const joiVoteOptionSchema = Joi.object().keys({
  title: Joi.string().required(),
  count: Joi.number(),
});

const joiVoteSchema = Joi.object({
  title: Joi.string().required(),
  creator: Joi.objectId().required(),
  expire_datetime: Joi.date().required(),
  is_process: Joi.boolean(),
  vote_options: Joi.array().items(joiVoteOptionSchema).required(),
  entire_count: Joi.number(),
  creatAt: Joi.date().required(),
  updateAt: Joi.date().required(),
});

const VoteSchema = new mongoose.Schema(joigoose.convert(joiVoteSchema));
VoteSchema.index('expire_datetime');
VoteSchema.index('creator');
VoteSchema.plugin(mongoosePaginate);

VoteSchema.pre("save", function (next) {
  const vote = this;
  try {
    vote.is_process = true;
    vote.entire_count = 0;

    next();
  } catch (error) {
    next(error);
  }
});

VoteSchema.pre(/^find/, async function (next) {
  await Vote.updateMany({ expiration: { $lte: new Date() } }, { is_process: false });
  next();
});

const Vote = mongoose.model("Vote", VoteSchema);
module.exports = Vote;
