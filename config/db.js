const mongoose = require('mongoose');

const dbConnect = () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }
  mongoose.connect(process.env.MONGODB_CONNECT_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (error) => {
    if (error) {
      console.log('몽고디비 연결 에러');
    } else {
      console.log('몽고디비 연결 성공');
    }
  });
};
mongoose.connection.on('error', (error) => {
  console.error('몽고디비 에러 ', error);
});
mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 재시작합니다.');
  dbConnect();
});

module.exports = dbConnect;