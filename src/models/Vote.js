const { Joi } = require("celebrate");
const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const joigoose = require("joigoose")(mongoose, null, {
  timestamp: true,
});

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
});

const VoteSchema = new mongoose.Schema(joigoose.convert(joiVoteSchema), { timestamps: true });

VoteSchema.index('expire_datetime');
VoteSchema.index('creator');
VoteSchema.plugin(mongoosePaginate);

VoteSchema.pre(/^find/, async function (next) {
  await Vote.updateMany({ expire_datetime: { $lte: new Date() } }, { is_process: false });
  next();
});

const Vote = mongoose.model("Vote", VoteSchema);
module.exports = Vote;
