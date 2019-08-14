const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);