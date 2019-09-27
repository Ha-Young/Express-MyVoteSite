module.exports = {
  mongoURI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@
  cluster0-rlera.mongodb.net/voting_platform?retryWrites=true&w=majority`,
};
