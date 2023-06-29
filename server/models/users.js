const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
});

const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel