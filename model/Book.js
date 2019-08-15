const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const bookSchema = new Schema({

    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
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