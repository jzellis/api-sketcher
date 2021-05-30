/* Mongoose schema for users */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var userSchema = new Schema({

    username: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 64,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 256,
    },
    bio: {
        type: String,
    },
    location: {
        type: String,
    },
    permissions: {
        type: String,
    },

},{timestamps: {dateAdded: 'dateAdded',dateModified: 'dateModified'}});


const Users = mongoose.model("Users", userSchema);
module.exports = Users;