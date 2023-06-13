const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    chatName : String
})

module.exports = mongoose.model('Chat', chatSchema)