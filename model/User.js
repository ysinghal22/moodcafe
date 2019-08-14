const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({

    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
        min: 6
    },
    sellbooks: [{
        type: Schema.ObjectId,
        default: []
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);