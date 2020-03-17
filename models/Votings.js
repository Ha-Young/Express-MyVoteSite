const mongoose = require('mongoose');
const { Schema } = mongoose;

const votingsSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true
    },
    writer: {
        type: String,
        required: true
    },
    writerId: {
        type: Schema.Types.ObjectId,
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
    select_option: {
        type:[String],
        required: true
    },
    progress: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Votings', votingsSchema);
