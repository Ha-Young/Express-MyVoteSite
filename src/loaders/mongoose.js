const { format } = require("date-fns");
const mongoose = require("mongoose");
const config = require("../config");

module.exports = async function () {
  mongoose.Promise = global.Promise;
  const connection = await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  // const Vote = require("../models/Vote");
  // if (process.env.NODE_ENV === "development") {
  //   const mock = async () => {
  //     for (let i = 0; i < 100; i++) {
  //       await Vote.create({
  //         title: `test${i}`,
  //         creator: mongoose.Types.ObjectId("6062f9acee0fae32f8a511d8"),
  //         vote_options: [
  //           {
  //             title: '1',
  //           },
  //           {
  //             title: '2',
  //           }
  //         ],
  //         expire_datetime: format( new Date(), "yyyy-MM-dd hh:mm:ss"),
  //       });
  //     }
  //   };
  //   mock();
  //   console.log("Success");
  // }

  return connection.connection.db;
};
