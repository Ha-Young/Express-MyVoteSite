const mongoose = require('mongoose');

module.exports = () => {
    const connect = () => {
        mongoose.connect(process.env.MONGODB_CONNET_ADDRESS, {
            dbName: 'voting-platform'
        });
    }
    connect();

    mongoose.connection.on('open', (error) => {
        console.log('mongoDB 연결');
    });

    mongoose.connection.on('error', (error) => {
        console.log('mongoDB 연결 에러');
    });

    mongoose.connection.on('disconnected', (error) => {
        console.log('mongoDB 연결 재시도');
        connect();
    });

}
