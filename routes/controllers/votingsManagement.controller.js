const { EXPIRATION_DATE, ERROR, OK } = require('../../constants');
const { MESSAGE } = require('../../constants/views');
const {
  CREATE_SUCCESS,
  DELETE_SUCCESS,
  VOTE_DONE,
  FAILURE,
} = require('../../constants/messages');
const UserService = require('../../services/user.service');
const VotingService = require('../../services/voting.service');
const userService = new UserService();
const votingService = new VotingService();
const tryCatchWrapper = require('../../utils/tryCatchWrapper');

exports.create = tryCatchWrapper(async (req, res) => {
  const created_by = req.session.userId;
  const data = req.body;
  const expires_at = `${data[EXPIRATION_DATE][0]} ${data[EXPIRATION_DATE][1]}`;
  const { title, options } = data;

  const optionsData = [];

  for (const option of options) {
    optionsData.push({
      content: option,
      voters: [],
    });
  }

  await votingService.createVoting(title, created_by, expires_at, optionsData);

  res.status(201).render(MESSAGE, {
    message: CREATE_SUCCESS
  });
});

exports.drop = async (req, res, next) => {
  let votingData;
  let creatorData;

  try {
    votingData = await votingService.getVoting(req.params._id);
    creatorData = await userService.getUser(votingData.created_by);

    const votingIndex = creatorData.votings.indexOf(votingData._id);

    creatorData.votings.splice(votingIndex, 1);
  } catch (err) {
    res.json({
      result: ERROR,
      message: FAILURE,
    });

    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }

    return;
  }

  try {
    userService.updateUser(creatorData._id, creatorData);
  } catch (err) {
    res.json({
      result: ERROR,
      message: FAILURE,
    });

    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }

    return;
  }

  const creatorDataCopy = { ...creatorData };

  try {
    votingService.deleteVoting(req.params._id);
  } catch (err) {
    try {
      userService.updateUser(creatorData._id, creatorDataCopy);

      res.json({
        result: ERROR,
        message: FAILURE,
      });

      return;
    } catch (err) {
      res.json({
        result: ERROR,
        message: FAILURE,
      });

      if (process.env.NODE_ENV === 'development') {
        console.error(err);
      }

      return;
    }
  }

  res.json({
    result: OK,
    message: DELETE_SUCCESS,
  });
};

exports.applyVote = tryCatchWrapper(async (req, res) => {
  const { selectedOptionValue } = req.body;
  const currentUser = req.session.userId;

  const voting = await votingService.getVoting(req.params._id);
  const { options } = voting;

  for (const option of options) {
    if (option.content === selectedOptionValue) {
      option.voters.push(currentUser);
    }
  }

  try {
    votingService.updateVoting(req.params._id, voting);
  } catch (err) {
    res.json({
      result: ERROR,
      message: FAILURE,
    });

    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }

    return;
  }

  res.json({
    result: OK,
    message: VOTE_DONE,
  });
});
