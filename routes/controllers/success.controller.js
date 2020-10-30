exports.success = async (req, res, next) => {
  const { message } = req.params;

  res.render('success', { message });
}
