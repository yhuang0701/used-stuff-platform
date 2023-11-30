// auth.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a new Mongoose schema for User
const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
