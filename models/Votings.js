const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: ObjectId } = Schema;

const votingsSchema = new Schema({
    id: {
        type: ObjectId,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    constructor: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    expiration_date: {
        type: Date,
        required: true
    },
    progress: {
        type: Boolean,
        required: true
    }
});

mongoose.model('Votings', votingsSchema);
