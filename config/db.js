const mongoose = require('mongoose');

module.exports = {
  connect: async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('몽구스가 성공적으로 서버를 몽고디비에 연결하였습니다');
    } catch (err) {
      console.error(err);
    }
  }
};
