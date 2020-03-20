const Voting = require('../models/Voting');
const timeUtil = require('./timeUtil');

exports.divideVotes = (rawVotes, userId) => {
  const ongoingVotes = [];
  const completedVotes = [];
  rawVotes.forEach((vote) => {
    if ((!userId) || userId.equals(vote.made._id)) {
      const voteInfo = {
        id: vote._id,
        title: vote.title,
        email: vote.made.email,
        expiration: vote.expiration_date.toString(),
      };

      const isOngoing = timeUtil.compareCurrentDate(null, null, vote.expiration_date);
      isOngoing ? ongoingVotes.push(voteInfo) : completedVotes.push(voteInfo);
    }
  });
  return [ongoingVotes, completedVotes];
}

exports.getOptions = (selectedVote) => {
  const options = [];
  let allCount = 0;
  selectedVote.options.forEach((count) => allCount = allCount + count);
  selectedVote.options.forEach((count, option) => {
    const percent = (count / allCount * 100).toFixed(1) + '%';
    percent !== 'NaN%' ? options.push([option, count, percent]) : options.push([option, count, '0%']);
  });
  options.sort((a, b) => b[1] - a[1]);
  return [options, allCount];
}

exports.updateVoting = async (selectedVote, selectedOption, user) => {
  const newCount = selectedVote.options.get(selectedOption) + 1;
  selectedVote.options.set(selectedOption, newCount);
  selectedVote.voted.push(user);
  const save = await selectedVote.save();
  return save;
}

exports.createVoting = async (title, made, expiration_date, options) => {
  const newVoting = new Voting({ 
    title,
    made,
    expiration_date,
    options: {},
    voted: [],
  });
  options.forEach((option) => newVoting.options.set(option, 0));
  const save = await newVoting.save();
  return save === newVoting;
}
