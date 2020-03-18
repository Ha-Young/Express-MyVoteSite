const express = require('express');
const router = express.Router();

router.get('/new', function(req, res, next) {
  res.render('newVoting');
});

router.post('/new', function(req, res, next) {
  const votingInfoKey = Object.keys(req.body);
  const isEmptyValueCheck = votingInfoKey.every(key => req.body[key] !== '');

  if (isEmptyValueCheck) {
    const itemsKey = votingInfoKey.slice(1, votingInfoKey.length - 1);
    const title = req.body.title;
    const endDate = req.body.endDate;
    console.log(itemsKey, title, endDate);


  }
  //FIXME: 빈값 발견시 모달 띄우기


  // 유효성 검사
  // 타이틀 ,시간 , 투표항목 다수 나눠야함
  // 디비에 저장
  // 홈에 투표 정보 넘겨주기 
  
  res.redirect('/');
});

module.exports = router;
