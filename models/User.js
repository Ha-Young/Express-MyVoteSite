const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email_id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    voteList_created_byUser:[{
        id: String,
        title: String,
        creation_date: Date,
        expiration_date: Date,
        progress: Boolean,
    }],
    user_voted_list: [{
        id: String,
        title: String,
        creation_date: Date,
        expiration_date: Date,
        progress: Boolean,
    }]
});

module.exports = mongoose.model('User', userSchema);
