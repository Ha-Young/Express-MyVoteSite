const mongoose = require("mongoose");

module.exports = function() {
  const connect = function() {
    if (process.env.NODE_EW !== "production") {
      mongoose.set("debug", true);
    }
    mongoose.connect(
      process.env.MONGODB_CONNECT,
      {
        dbName: "vote",
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      function(error) {
        if (error) {
          console.log("몽고디비 연결 에러", error);
        } else {
          console.log("몽고디비 연결 성공");
        }
      }
    );
  };
  connect();
  mongoose.connection.on("error", function(error) {
    console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
    connect();
  });
  mongoose.connection.on("disconnected", function() {
    console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
    connect();
  });
};
