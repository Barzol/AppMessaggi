const express = require('express')
const userController= require("../controllers/auth")

const router = express.Router()

router.post("/", userController.login)
router.post("/register", userController.register)
router.post("/AllUser", userController.getAllUsers)

module.exports = router