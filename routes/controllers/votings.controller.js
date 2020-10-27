const Voting = require('../../models/Voting');

exports.create = async (req, res, next) => {
  const created_by = res.session.userId;
  const data = req.body;
  const { title, options } = data;
  const expires_at = `${data['expiration-date'][0]} ${data['expiration-date'][1]}`;
  console.log(expires_at);
  console.log(req.session);

  const newVotingData = {
    title,
    created_by,
    expires_at,
    is_open: true,
    options,
    voters: [],
  };
};
