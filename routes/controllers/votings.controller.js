const createError = require('http-errors');

const Vote = require('../../models/Vote');
const User = require('../../models/User');

exports.getNewVote = function getNewVote(req, res, next) {
  const {
    session: { user }
  } = req;
  res.status(200).render('newVote', { user });
};

// SHOULD BE UPDATE (item list check, handling success, failed)
exports.postNewVote = async function postNewVote(req, res, next) {
  const {
    body,
    session: { user }
  } = req;

  try {
    if (body && body.itemList && body.itemList.length <= 1) throw createError(404);

    const newVote = await Vote.create({
      title: body.title,
      author: user._id,
      expired: body.expired,
      isExpired: false,
      candidateList: body.itemList.map((item) => {
        return {
          title: item,
          count: 0
        };
      })
    });

    const updatedUser = await User.findByIdAndUpdate(user._id, {
      $push: { myVoteList: newVote._id }
    });

    updatedUser.save();
    req.flash('success', 'Succeed creating new vote!');
    res.redirect('/');
  } catch (error) {
    next(error);
  }
};

// SHOULD BE UPDATE (error handling)
exports.getVote = async function getVote(req, res, next) {
  res.clearCookie('callback');

  const {
    params: { id: vote_id },
    session
  } = req;
  let isAuthor = false;
  let isParticipated;

  try {
    const vote = await Vote.findById(vote_id).populate('author', 'name');
    if (!vote) throw new Error('No exists');

    if (session && session.user) {
      isAuthor = session.user._id === vote.author._id.toString();
      isParticipated = vote.participatedUser.find(
        (user) => user._id.toString() === session.user._id
      );
    }

    res.status(200).render('voteDetail', { user: session.user, vote, isAuthor, isParticipated });
  } catch (error) {
    next(error);
  }
};

// SHOULD BE UPDATE (user participation)
exports.postVote = async function postVote(req, res, next) {
  const {
    params: { id: vote_id },
    body,
    session
  } = req;

  try {
    const vote = await Vote.findById(vote_id);
    const targetItem = vote.candidateList.find((item) => item.title === body.item);
    const targetExpired = vote.expired;

    if (checkExpire(targetExpired) > 0) {
      const newCount = (targetItem.count += 1);

      await Vote.updateOne(
        { _id: vote_id, 'candidateList.title': body.item },
        {
          $push: { participatedUser: session.user._id },
          $set: {
            'candidateList.$.count': newCount
          }
        }
      );
    } else {
      await Vote.updateOne(
        { _id: vote_id },
        {
          isExpired: true
        }
      );
    }

    res.redirect(`/votings/${vote_id}`);
  } catch (error) {
    next(error);
  }
};

// SHOULD BE UPDATE
exports.deleteVote = function deleteVote(req, res, next) {
  res.status(200).send({ result: 'ok' });
};

function checkExpire(target) {
  return new Date(target).getTime() - new Date().getTime();
}
