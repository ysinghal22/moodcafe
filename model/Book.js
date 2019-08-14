const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const bookSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('Book', bookSchema);