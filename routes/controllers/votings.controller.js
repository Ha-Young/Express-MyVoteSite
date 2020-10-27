const Voting = require('../../models/Voting');

exports.create = (req, res, next) => {
  const created_by = req.session.userId;
  const data = req.body;
  const expires_at = `${data['expiration-date'][0]} ${data['expiration-date'][1]}`;
  const { title, options } = data;
  let optionsData = [];

  for (const option of options) {
    const content = option;
    const voters = [];

    optionsData.push({ content, voters });
  }

  const newVotingData = new Voting({
    title,
    created_by,
    expires_at,
    options: optionsData,
  });

  Voting.create(newVotingData, err => {
    if (err) {
      next(err);

      return;
    }

    res.status(201).render('createSuccess');
  });
};
