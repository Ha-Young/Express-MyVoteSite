const express = require('express');

const Votes = require('../models/Votes');
const checkAuthentication = require('../middlewares/authenticate');

const router = express.Router();

const ONGOING = "진행 중";
const CLOSED = "종료됨";

router.get('/', checkAuthentication, async (req, res, next) => {
  const votes = await Votes.find().populate('created_by').lean();

  // 진행 중, 제목, 만료까지 남은 시간, options, 00명 참여중, 투표하기
  const makeVisualData = vote => {
    const { title, select_options: options, created_by: { username }, expires_at } = vote;
    let totalVoters = 0;
    options.forEach(option => {
      totalVoters += option.vote_counter;
    });

    const voteStatus = expires_at.toISOString() > new Date().toISOString() ? ONGOING : CLOSED;

    return {
      voteStatus,
      title,
      expires_at,
      options,
      totalVoters,
    };
  };

  res.render('home', { votes });
});

module.exports = router;


// 테스트1 [
//   {
//     vote_counter: 0,
//     voter: [],
//     _id: 5e7088864b56c509799a9921,
//     description: '선지1'
//   },
//   {
//     vote_counter: 0,
//     voter: [],
//     _id: 5e7088864b56c509799a9922,
//     description: '선지2'
//   },
//   {
//     vote_counter: 0,
//     voter: [],
//     _id: 5e7088864b56c509799a9923,
//     description: '선지3'
//   },
//   {
//     vote_counter: 0,
//     voter: [],
//     _id: 5e7088864b56c509799a9924,
//     description: '선지4'
//   }
// ] soldonii 2020-12-31T17:02:00.000Z

// [
//   {
//     _id: 5e70710319cc5b2d86614646,
//     title: 'test 일정',
//     select_options: [ [Object], [Object], [Object], [Object] ],
//     created_by: {
//       votes_created: [],
//       votes_voted: [],
//       _id: 5e6f91e9a3fb3a3a05a2d1e3,
//       voted_voted: [],
//       username: 'soldonii',
//       firstname: 'hyunsol',
//       lastname: 'do',
//       email: 'dhs0113@naver.com',
//       password: '$2b$12$yUCD0lqEAZoUGdIRXyWFou5tRSw89P1oPcLuzIfHBJCAO77xx3wcq',
//       gender: 'male',
//       created_at: 2020-03-16T14:49:13.377Z,
//       updated_at: 2020-03-16T14:49:13.377Z,
//       __v: 0
//     },
//     expired_at: 2019-12-31T16:00:00.000Z,
//     created_at: 2020-03-17T06:41:07.111Z,
//     updated_at: 2020-03-17T06:41:07.111Z,
//     __v: 0
//   },
//   {
//     _id: 5e7073a819cc5b2d8661464c,
//     title: '도현솔의 투표!',
//     select_options: [ [Object], [Object], [Object], [Object] ],
//     created_by: {
//       votes_created: [],
//       votes_voted: [],
//       _id: 5e70737619cc5b2d8661464b,
//       username: 'doniisol',
//       firstname: 'hyunsol',
//       lastname: 'do',
//       email: 'dhs0113@gmail.com',
//       password: '$2b$12$a2ODFqSyRd7sMraqxwUN0Oq0wwebC8gX/O6lK9BUNVcVy15Cskys2',
//       gender: 'male',
//       created_at: 2020-03-17T06:51:34.087Z,
//       updated_at: 2020-03-17T06:51:34.087Z,
//       __v: 0
//     },
//     expired_at: 2021-02-02T05:00:00.000Z,
//     created_at: 2020-03-17T06:52:24.949Z,
//     updated_at: 2020-03-17T06:52:24.949Z,
//     __v: 0
//   },
//   {
//     _id: 5e70806e04f0de0618d6a8ed,
//     title: '테스트 투표',
//     select_options: [ [Object], [Object] ],
//     created_by: {
//       votes_created: [],
//       votes_voted: [],
//       _id: 5e70737619cc5b2d8661464b,
//       username: 'doniisol',
//       firstname: 'hyunsol',
//       lastname: 'do',
//       email: 'dhs0113@gmail.com',
//       password: '$2b$12$a2ODFqSyRd7sMraqxwUN0Oq0wwebC8gX/O6lK9BUNVcVy15Cskys2',
//       gender: 'male',
//       created_at: 2020-03-17T06:51:34.087Z,
//       updated_at: 2020-03-17T06:51:34.087Z,
//       __v: 0
//     },
//     expired_at: 2021-02-01T17:00:00.000Z,
//     created_at: 2020-03-17T07:46:54.642Z,
//     updated_at: 2020-03-17T07:46:54.642Z,
//     __v: 0
//   }
// ]