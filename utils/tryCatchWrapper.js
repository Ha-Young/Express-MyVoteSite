function tryCatchWrapper(fn) {
  return async function(req, res, next) {
    try {
      return await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = tryCatchWrapper;
