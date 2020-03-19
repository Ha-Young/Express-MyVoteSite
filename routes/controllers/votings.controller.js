
const saveDataForNewVote = require('../../lib/saveDataForNewVote');
const getDataForPollResults = require('../../lib/getDataForPollResults');
const User = require('../../models/user');
const Poll = require('../../models/poll');

module.exports = {
  renderNewVoing(req, res, next) {
    res.render('newvoting', { hasLoggedIn: true });
  },
  async newVotePostHandler (req, res, next) {
    try {
      const time = `${req.body.date} ${req.body.time}`;
      if (new Date() > new Date(time)) {
        return res.redirect('/votings/failure');
      }

      await saveDataForNewVote(req, time);
      res.redirect('/votings/success');
    } catch(e) {
      next(e);
    }
  },
  renderSuccess(req, res, next) {
    res.render('success', { hasLoggedIn: true });
  },
  renderFailure(req, res, next) {
    res.render('failure', { hasLoggedIn: true });
  },
  async renderIndividualPoll(req, res, next) {
    const id = req.params.poll_id;
    const poll = await Poll.findById(id).populate('creator');
    let isCreator = false;
    let data = null;
  
    if (req.isAuthenticated()) {
      const { user } = req.session.passport;
      if (poll.creator.id === user) isCreator = true;
      data = getDataForPollResults(isCreator, poll);
      console.log(data)
      return res.render('poll', data);
    }
    console.log(data)
    data = getDataForPollResults(isCreator, poll);
    return res.render('poll', data);
  },
  async saveVotingResults(req, res, next) {
    const { poll } = res.locals;
    const { user }  = req.session.passport;
    const { answer } = req.body;
  
    poll.answers.forEach((option) => {
      if (option.answer === answer) option.votes += 1;
    });
  
    poll.finishedUsers.push(user);
    await poll.save();
    res.redirect('/');
  },
  async deleteApoll(req, res, next) {
    const { pollId } = req.body;
    const poll = await Poll.findById(pollId).populate('creator');
    const userId = poll.creator.id;
    const user = await User.findById(userId);
    let index = '';
    user.myPolls.some((poll, i) => {
      if (String(poll.myPoll) === String(pollId)) {
        return index = i;
      }
    });
  
    user.myPolls.splice(index, 1);
    await user.save();
    await Poll.findOneAndDelete(pollId);
    return res.status(200).json({ result: 'ok' });
  }
};
