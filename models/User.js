const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', userSchema);
