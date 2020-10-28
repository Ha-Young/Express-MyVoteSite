const Voting = require('../../models/votingsModel');
const User = require('../../models/usersModel');

module.exports = async (req, res, next) => {
  try {
    const parentId = req.params.id;
    const childId = req.body.data;
    const userId = req.session.user_id;

    const voting = await Voting.findOne({ _id: parentId }); // 해당 아이디의 도큐먼드
    const result = voting.selectOptions.id(childId); //선택된 옵션의 아이디 카운트 이름 들어있는 객체

    // console.log(req.session, 'stion');
    // console.log(voting, 'voting');
    // console.log(result, 'rr');

    const notFirstVotedUser = voting.votedUsers.filter((votedUser) => {
      // console.log(userId, 'stion');
      // console.log(votedUser, 'vu');
      return userId === votedUser;
    });

    if (!userId) {
      console.log('unlogin');
      return res.status(303).redirect('/login');
      throw new Error('please login first');
    }

    if (notFirstVotedUser.length) {
      throw new Error('you only can vote once per each vote');
    }

    voting.votedUsers.push(req.session.user_id);
    result.count++;
    await voting.save();

    next();
  } catch (err) {
    next(err);
  }
};
