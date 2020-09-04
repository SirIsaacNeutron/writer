const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Note: does not actually validate uniqueness
    },
    password: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;