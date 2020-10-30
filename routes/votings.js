const express = require('express');
const mongoose = require('mongoose');
const Voting = require('../models/Voting');
const Count = require('../models/Count');
const { validateLogin, validateDate, validateText } = require('./middlewares/validation');
const { findById, findOneAndDelete } = require('../models/Voting');

const router = express.Router();
const defalultTextItemCounts = 3;
// /* GET users listing. */
let checkedOptionIndex = null;

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.put('/vote', async (req, res, next) => {
  if (!req.user) {
    preUrl = `votings/${req.body.votedId}`;
    return res.json(`/login/${preUrl}`);
  }

  checkedOptionIndex = req.body.checkedOptionIndex;
  let { votedId } = req.body;

  if (votedId.includes('/')) {
    votedId = votedId.split('/')[1];
  }
  const targetVoting = await Voting.findOne({ _id: votedId });
  const targetIndex = req.body.checkedOptionIndex;
  const voterProfileId = req.user.profileId;

  if (!targetVoting.voters.includes(voterProfileId)) {
    targetVoting.voters.push(voterProfileId);
    targetVoting.options[targetIndex].voters.push(voterProfileId);
    targetVoting.options[targetIndex].count += 1;

    await targetVoting.save();
  }

  await Voting.findOneAndUpdate({ _id: req.body.votedId }, { $set: { canReVote: true } });

  return res.json('got it');
});

router.get('/new', async (req, res, next) => {
  await Count.findOneAndUpdate({}, { addCount: 0 });
  return res.render('newVote', {
    notificationMessage: {
      invalidText: null,
      invalidDate: null,
    },
    textItemCount: defalultTextItemCounts,
  });
});

router.get('/addTextItem', async (req, res, next) => {
  let count = await Count.findOne({});
  count = count.addCount;
  await Count.findOneAndUpdate({}, { addCount: count + 1 });
  res.render('newVote', {
    notificationMessage: {
      invalidText: null,
      invalidDate: null,
    },
    textItemCount: defalultTextItemCounts + count + 1,
  });
});

router.get('/revote/:id', async (
  {
    url,
    params: { id },
    user: { profileId },
  },
  res,
  next,
) => {
  const targetVoting = await Voting.findOne({ _id: id });
  const targetLocation = targetVoting.voters.indexOf(profileId);
  targetVoting.voters.splice(targetLocation, 1);

  for (let index = 0; index < targetVoting.options.length; index++) {
    const targetIndex = targetVoting.options[index].voters.indexOf(profileId);
    if (targetIndex !== -1) {
      targetVoting.options[index].voters.splice(targetIndex, 1);
      targetVoting.options[index].count -= 1;
    }
  }

  await targetVoting.save();
  await Voting.findOneAndUpdate({ _id: id }, { $set: { canReVote: false } });
  return res.redirect(`/votings/${id}`);
});

router.get('/:id', async (
  {
    params: { id },
    user,
  },
  res,
  next,
) => {
  const allVotings = await Voting.find({});
  for (let index = 0; index < allVotings.length; index++) {
    if (allVotings[index].verifyExpireDate()) {
      allVotings[index].isExpire = true;
      await allVotings[index].save();
    }
  }

  let isCreator = false;
  const targetVoting = await Voting.findOne({ _id: id });
  if (user) {
    if (targetVoting.creatorProfilId === user.profileId) {
      isCreator = true;
    }
  }

  if (targetVoting.isExpire) {
    const counts = [];
    for (let index = 0; index < targetVoting.options.length; index++) {
      counts.push(targetVoting.options[index].count);
    }

    return res.render('votingResult', {
      voting: targetVoting, islogined: !!user, isCreator, maxCount: Math.max(...counts),
    });
  }

  res.render('voting', { voting: targetVoting, islogined: !!user, isCreator });
});

router.get('/delete/:id', async (req, res, next) => {
  await Voting.findOneAndDelete({ _id: req.params.id });
  res.redirect('/');
});

router.post('/new', validateText, validateDate, async (
  {
    body: {
      subject, texts, date, time, url,
    },
    user: { profileId, userName },
  },
  res,
  next,
) => {
  const fullDate = date.split('-').concat(time.split(':'));
  if (fullDate[1] === '01') {
    fullDate[1] = 12;
  } else {
    fullDate[1] -= 1;
  }

  const addedTexts = texts.filter((text) => !!text);
  const newOptions = [];

  for (let index = 0; index < addedTexts.length; index++) {
    newOptions.push({
      text: addedTexts[index],
    });
  }

  const data = {
    subject,
    options: newOptions,
    date: new Date(...fullDate),
    creatorProfilId: profileId,
    profileId,
    userName,
    isExpire: false,
  };

  try {
    await Voting.create(data);
    return res.redirect('/');
  } catch (err) {
    next(err);
  }
});
module.exports = router;
