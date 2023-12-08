// Assuming auth.js is in the same directory
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemInfoSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type:Number,
        required: true,
        default:0
    },
    label: [{
        type: String,
        required: true
    }],
    locations: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String // Assuming images are stored as URLs or paths
    }],
    postDate: {
        type: Date,
        default: Date.now // Automatically set the date when item is created
    },
    sold: {
        type: Boolean,
        default:false
    }
});

const ItemInfo = mongoose.model('ItemInfo', itemInfoSchema);

module.exports = ItemInfo;
