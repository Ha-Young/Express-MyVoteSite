const User = require('../models/user');
const Poll = require('../models/poll');

module.exports = async(req, time) =>{
  const { topic } = req.body;
  const id = req.session.passport.user;
  let answers = [];
  for (let key in req.body) {
    if (key.includes('answer')) {
      answers.push(req.body[key]);
    }
  }
      
  const poll = await new Poll({ 
    topic, 
    creator: id, 
    expiringTime: new Date(time),
  }).save();

  const user = await User.findById(id);
  user.myPolls.push(poll.id);
  await user.save();
  answers.forEach((answer) => {
    poll.answers.push({ answer })
  });

  await poll.save();
};
