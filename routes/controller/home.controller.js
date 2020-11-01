const { getAllVoteData } = require('../../services/Vote');
const { getOneUserData } = require('../../services/User');

const renderHome = async (req, res, next) => {
  try {
    const isLoggedIn = req.session.passport ? true : false;
    const user = isLoggedIn ? await getOneUserData(req.session.passport.user._id) : undefined;

    const allVotesList = await getAllVoteData();
    const expiredMemoArray = [];

    for (let i = 0; i < allVotesList.length; i++) {
      const due = allVotesList[i].dueDate.valueOf();
      const now = new Date().valueOf();

      expiredMemoArray[i] = due > now ? false : true;
    }

    const votedMemoArray = [];
    if (isLoggedIn && user) {
      for (let i = 0; i < allVotesList.length; i++) {
        let isChecked = false;

        for (let j = 0; j < allVotesList[i].voter.length; j++) {
          if (user._id.equals(allVotesList[i].voter[j]._id)) {
            votedMemoArray[i] = true;
            isChecked = true;
            break;
          }
        }

        if (!isChecked) {
          votedMemoArray[i] = false;
        }
      }
    }

    res.render('index', {
      isLoggedIn: isLoggedIn,
      user: user,
      voteList: allVotesList,
      expired: expiredMemoArray,
      voted: votedMemoArray
    });
  } catch (err) {
    next(err);
  }
};

module.exports = renderHome;
