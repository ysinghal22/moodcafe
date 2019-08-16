const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const purchaseSchema = new Schema({

    purchasedBy: [{
        _id : false,
        email:{
            type: String,
            ref: 'Users',
            trim: true
        },
        purchaseAt: {
            type: Date,
            default: Date.now(),
            // required: true
        }
    }],
    bookId: {
        type: Schema.ObjectId,
        ref: 'Book'
    }
})

module.exports = mongoose.model('Purchase', purchaseSchema);