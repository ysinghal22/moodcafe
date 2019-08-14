const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const purchaseSchema = new Schema({

    email: {
        type: String,
        ref: 'Users'
    },
    booksId: [{
        type: Schema.ObjectId,
        default: []
    }]
})

module.exports = mongoose.model('User', userSchema);