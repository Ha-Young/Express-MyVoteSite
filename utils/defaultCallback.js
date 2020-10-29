const DEFAULT_CALLBACK = (err) => {
  if (err) throw Error(err);

  return;
};

module.exports = DEFAULT_CALLBACK;
