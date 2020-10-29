const express = require('express');
const router = express.Router();
const checkAuthenticated = require('./middlewares/autorization');
const Voting = require('../models/Voting');

router.get('/new', function (req, res, next) {
  let username = undefined;
  if (req.user) {
    username = req.user.username;
  }
  res.render('createAgenda', { username });
});

router.post('/new', checkAuthenticated, async function (req, res, next) {
  const username = req.user.username;
  let votingList = undefined;
  const { title, option, date, time } = req.body;
  const optionDetail = [];
  const dateAndTime = `${date} ${time}:00`
  const isValid = new Date(dateAndTime) > new Date();

  if (!option || option.length <= 1) {
    const popUpMessage = '옵션을 2개 이상 입력해주세요';
    return res.render('createAgenda', { username, popUpMessage });
  }

  if (!isValid) {
    const popUpMessage = '과거의 날짜로는 설정할 수 없습니다.';
    return res.render('createAgenda', { username, popUpMessage });
  }

  for (let i = 0; i < option.length; i++) {
    const obj = {};
    obj.description = option[i];
    obj.votes = 0;
    optionDetail.push(obj);
  }

  const newVoting = new Voting({
    author: req.user.email,
    title: title,
    option: optionDetail,
    date: date,
    time: time
  });

  try {
    await newVoting.save();
    votingList = await Voting.find();
  } catch (err) {
    console.log("new Voting save error OR finding all voting list");
  }

  res.render('index', { username, votingList });
});

router.get('/:id', async function (req, res, next) {
  let username = undefined;
  let userEmail = undefined;
  let matchCurrentUserAndAuthor = false;
  let finalResult = [];
  if (req.user) {
    username = req.user.username;
    userEmail = req.user.email;
  }
  try {
    const targetVoting = await Voting.findById(req.params.id).exec();
    const options = targetVoting.option
    const targetVotingId = targetVoting._id
    const dateAndTime = `${targetVoting.date} ${targetVoting.time}:00`
    const isValid = new Date(dateAndTime) > new Date();
    const title = targetVoting.title;
    const author = targetVoting.author;
    if (author === userEmail) {
      matchCurrentUserAndAuthor = true;
    }
    if (!isValid) {
      const results = [];
      for (let i = 0; i < options.length; i++) {
        results.push(options[i].votes);
      }
      const biggestNum = Math.max(...results);

      for (let i = 0; i < options.length; i++) {
        if(options[i].votes === biggestNum) {
          finalResult.push(options[i]);
        }
      }
    }
    res.render('votingDetail', {
      username,
      matchCurrentUserAndAuthor,
      title,
      author,
      dateAndTime,
      targetVotingId,
      isValid,
      options,
      finalResult
    });
  } catch (err) {
    next(err);
  }
});

router.put('/:id/', checkAuthenticated, async function (req, res, next) {
  console.log("targetVotingId", req.params.id);//5f97fe2019def952be8e6c83
  console.log(req.user)
  console.log(req.body.targetOptionId);
  const targetOptionId = req.body.targetOptionId;

  try {
    const targetVoting = await Voting.findById(req.params.id);
    if (targetVoting.userVoted.indexOf(req.user.email) !== -1) {
      res.json({ message: "이미 투표를 진행했습니다" });
    } else {
      try {
        await Voting.updateOne(
          { _id: req.params.id, 'option._id': targetOptionId },
          { $push: { userVoted: req.user.email }, $inc: { 'option.$.votes': 1 } }
        );
        res.json({ message: "투표가 성공적으로 반영됐습니다" });
      } catch (err) {
        console.log("투표 업데이트 에러");
        //next(err);
      }
    }
  } catch (err) {
    console.log("이미 투표한 유저 디비에서 불러오기 에러");
  }
  console.log("투표 완료");
});

router.delete('/:id/', checkAuthenticated, async function (req, res, next) {
  try {
    await Voting.deleteOne({ _id: req.params.id });
    res.json({ message: "해당 게시물을 삭제했습니다" });
  } catch (err) {
    console.log("delete error");
  }
  console.log("delete 성공");
});

module.exports = router;
