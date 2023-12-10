// Assuming auth.js is in the same directory
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserInfoSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
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
        required: false
    },
    favorite:[{
        type: Schema.Types.ObjectId,
        ref: 'Item',
        default:[]
    }],
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item',
        default:[]
    }]
});

const UserInfo = mongoose.model('UserInfo', UserInfoSchema);

module.exports = UserInfo;
