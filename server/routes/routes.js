const express = require('express')
const authController= require("../controllers/authController")
const chatController= require("../controllers/chatController")
const messageController= require("../controllers/messageController")

const router = express.Router()

router.get('/', (req, res) => {
    res.json({message: 'root for chat api'})
})

// Routes Autenticazione
router.post("/login", authController.login)
router.post("/register", authController.register)
router.get("/logout", authController.logout)

//Routes Chats
router.get('/allusers/:id', chatController.getFriends)
router.post('/addFriend', UserController.addFriend)
router.post('/removeFriend', UserController.removeFriend)

// Routes Messaggi
router.post('/sendmessage/', messageController.sendMessage)
router.post('/allmessage/',messageController.getAllMessage)

module.exports = router