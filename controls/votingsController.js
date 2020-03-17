import Vote from '../models/vote';

export const getHome = async (req, res) => {
  try {
    const votes = await Vote.find();

    res.render('index', { votes });
  } catch (err) {
    // Error handling
  }
};

export const getNewVote = (req, res) => {
  res.render('newVoting');
};

export const getVoteDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const vote = await Vote.findById(id).populate('creator');

    res.render('votingDetail', { vote });
  } catch (err) {
    // Error handling
  }
};

export const postVotings = async (req, res) => {
  try {
    const { voting_name, expiration_date, expiration_time, options } = req.body;
    const expirated = `${expiration_date}T${expiration_time}`;
    const handledOptions = options.map(option => ({ title: option }));
    const vote = await Vote.create({
      title: voting_name,
      options: handledOptions,
      expirated,
      creator: req.user.id,
    });

    res.redirect(`/votings/${vote.id}`);
  } catch (err) {
    // Error handler
  }
};

export const postVotingDetail = async (req, res) => {
  try {
    const voteId = req.params.id;
    const userId = req.user.id;
    const value = req.body.option;
    const vote = await Vote.findById(voteId);
    const targetOption = vote.options.find(option => option.title === value);

    targetOption.received.push(userId);
    await vote.save();

    // Redirect Success
  } catch (err) {
    // Error handling
  }
};