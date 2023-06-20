const express = require('express')
const userController= require("../controllers/auth")

const router = express.Router()

router.get('/', (req, res) => {
    res.json({message: 'root for chat api'})
})

router.post("/login", userController.login)
router.post("/register", userController.register)
router.post("/all", userController.getAllUsers)
// router.get('/byUserId/:userId', postsController.getPostsByUserId)

module.exports = router