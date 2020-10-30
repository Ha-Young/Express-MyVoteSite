const DEFAULT_CALLBACK = (err, res) => {
  if (err) throw Error(err);

  return res;
};

module.exports = DEFAULT_CALLBACK;
