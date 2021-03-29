const mongoose = require("mongoose");

const connectMongoDB = () => {
  mongoose.connect(process.env.DB_ADDRESS,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  );

  const db = mongoose.connection;
  db.on("error", (err) => console.error(`DB connection Error : \n${err}`));
  db.once("open", () => console.log("Connected"));
};

module.exports = connectMongoDB;
