const moment = require('moment');

const {
  getOneUserData,
  updateOneUserData
} = require('../../services/User');

const {
  createNewVote,
  getOneVoteData,
  updateOneVoteData,
  deleteOneVoteData
} = require('../../services/Vote');

exports.renderNewVotingPage = async (req, res, next) => {
  try {
    const isLoggedIn = req.session.passport ? true : false;
    const userId = isLoggedIn ? req.session.passport.user._id : undefined;
    const userInfo = await getOneUserData(userId);

    res.render('newVoting', {
      isLoggedIn: isLoggedIn,
      user: userInfo,
      tomorrow: moment().add(1, 'days').format('YYYY-MM-DD')
    });
  } catch (err) {
    next(err);
  }
};

exports.createNewVote = async (req, res, next) => {
  try {
    const selections = req.body.selections;
    const transformedArray = [];

    selections.forEach((selection, index) => {
      transformedArray[index] = {
        subTitle: selection,
        count: 0
      };
    });

    const parsedDue = Date.parse(req.body.dueDate);
    const newVoteInfo = {
      title: req.body.title,
      selections: transformedArray,
      dueDate: parsedDue,
      author: {
        email: req.session.passport.user.email,
        objectIdInDB: req.session.passport.user._id
      },
      voter: []
    };

    await createNewVote(newVoteInfo);

    res.redirect('/votings/success');
  } catch (err) {
    next(err);
  }
};

exports.renderSuccess = (req, res, next) => {
  try {
    const isLoggedIn = req.session.passport ? true : false;
    const user = isLoggedIn ? req.session.passport.user : undefined;

    res.render('success', {
      isLoggedIn: isLoggedIn,
      user: user
    });
  } catch (err) {
    next(err);
  }
};

exports.renderSpecificVoting = async (req, res, next) => {
  try {
    const isLoggedIn = req.session.passport ? true : false;

    const userId = isLoggedIn ? req.session.passport.user._id : undefined;
    const voteId = req.params.id;

    req.session.lastVistedVoteId = voteId;

    const voteData = await getOneVoteData(voteId);

    const loggedInUser = isLoggedIn ? await getOneUserData(userId) : undefined;
    const voterIdInDB = isLoggedIn ? loggedInUser._id : undefined;
    const isAuthorVisited = voteData.author.email === loggedInUser.email ? true : false;
    const voters = voteData.voter;
    let voter = true;

    voters.forEach((voter) => {
      if (voter === req.sessionID) {
        voter = false;
      }
    });

    const due = voteData.dueDate.valueOf();
    const now = new Date().valueOf();
    const isExpired = due > now ? false : true;
    const parsedDue = `Due - ${voteData.dueDate.getYear() - 100}년 ${voteData.dueDate.getMonth() + 1}월 ${voteData.dueDate.getDate()}일`;

    if (isExpired) {
      res.redirect(`/votings/${req.params.id}/result`);
    } else {
      res.render('voting', {
        isLoggedIn: isLoggedIn,
        user: loggedInUser,
        voterId: voterIdInDB,
        isAuthorVisited: isAuthorVisited,
        hasVote: voter,
        voteData: voteData,
        isExpired: isExpired,
        due: parsedDue
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateVoteSelectionAndVoter = async (req, res, next) => {
  try {
    const voteId = req.body.voteId;
    const voterId = req.body.voterId;
    const selectionId = req.body.selectionId;

    await updateOneVoteData(
      { '_id': voteId },
      { $push: { 'voter': voterId } }
    );

    await updateOneVoteData(
      { 'selections._id': selectionId },
      { $inc: { 'selections.$.count': 1 } }
    );

    await updateOneUserData(
      { '_id': voterId },
      { $push: { 'voteId': voteId } }
    );

    res.json('Vote complete!');
  } catch (err) {
    next(err);
  }
};

exports.deleteVote = async (req, res, next) => {
  try {
    const deleteResult = await deleteOneVoteData({ _id: req.params.id });

    if (deleteResult.ok === 1) {
      res.json('Delete Success!');
    } else {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

exports.showVotingResult = async (req, res, next) => {
  try {
    const isLoggedIn = req.session.passport ? true : false;
    const user = isLoggedIn ? await getOneUserData(req.session.passport.user._id) : undefined;

    const voteId = req.params.id;
    const voteInfo = await getOneVoteData(voteId);
    const selections = voteInfo.selections;
    let maxNumberVoted = -1;

    selections.forEach((selection) => {
      if (selection.count > maxNumberVoted) {
        maxNumberVoted = selection.count;
      }
    });

    res.render('result', {
      isLoggedIn: isLoggedIn,
      user: user,
      selections: voteInfo.selections,
      max: maxNumberVoted,
      voteId: voteId
    });
  } catch (err) {
    next(err);
  }
};
