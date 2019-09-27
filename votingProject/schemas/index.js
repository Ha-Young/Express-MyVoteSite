const mongoose = require("mongoose");

const DATABASE_URI = process.env.DATABASE_URI;

module.exports = () => {
  const connect = () => {
    if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }
    mongoose.connect(
      `${DATABASE_URI}`,
      {
        dbName: "voting",
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      },
      error => {
        if (error) {
          console.log("몽고디비 연결 에러", error);
        } else {
          console.log("몽고디비 연결 성공");
        }
      }
    );
  };
  connect();
  mongoose.connection.on("error", error => {
    console.error("몽고디비 연결 에러", error);
  });
  mongoose.connection.on("disconnected", () => {
    console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
    connect();
  });
};
