// Assuming auth.js is in the same directory
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./Auth.js'); // Import User model
const Item = require('./UserInfo.js')

const UerInfoSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId, // Reference to User model
        ref: User.userID,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    items: [{
        type: Schema.Types.ObjectId, // Assuming items are represented by their own ObjectId
        ref: Item.itemID // Reference to another model that you would define for individual items, if necessary
    }]
});

const UserInfo = mongoose.model('ItemInfo', UerInfoSchema);

module.exports = UserInfo;
