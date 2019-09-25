const User = require('./models/Users');

exports.switchIdToName = async (id, voting) => {
  const user = await User.findOne({ _id: id });
  voting.creator = user.name;
  return voting;
}

exports.addIsOnProgressPropertyTo = async (editedVoting, voting) => {
  const today = new Date();
  const expirationDay = voting.end_at;
  const difference = expirationDay - today;
  const isOnProgress = (difference > 0);
  editedVoting.isOnProgress = isOnProgress;
  return editedVoting;
}
