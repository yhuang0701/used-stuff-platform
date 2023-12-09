// Assuming auth.js is in the same directory
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./Auth.js'); // Import User model
const Item = require('./UserInfo.js')

const UerInfoSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true
    },
    liked:[{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
});

const UserInfo = mongoose.model('ItemInfo', UerInfoSchema);

module.exports = UserInfo;
