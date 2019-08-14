const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const bookSchema = new Schema({

    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: String
    },
    quantity: {
        type: Number,
        default: 1
    },
    sellers: [{
        type: Schema.ObjectId,
        default: [],
        ref: 'Users'
    }]
})

module.exports = mongoose.model('Book', bookSchema);