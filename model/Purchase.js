const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const purchaseSchema = new Schema({

    email: {
        type: String,
        required: true,
    },
    booksId: {
        type: Schema.ObjectId,
        required: true,
    }
})

module.exports = mongoose.model('User', userSchema);