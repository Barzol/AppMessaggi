const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    chat : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content : String

})

module.exports = mongoose.model('Message', messageSchema)