const express = require('express')
const authController= require("../controllers/authController")
const chatController= require("../controllers/chatController")
const messageController= require("../controllers/messageController")

const router = express.Router()

router.get('/', (req, res) => {
    res.json({message: 'root for chat api'})
})

router.post("/login", authController.login)
router.post("/register", authController.register)
router.post("/chats", chatController.getChats)
//router.get('/messages/:userId', messageController.getMessage)
// router.get('/messages', messageController.sendMessage)
// router.get('/???', userController.getChatsFromCookie)

module.exports = router