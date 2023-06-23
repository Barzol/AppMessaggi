const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose').default
const cors = require('cors')
const dotenv = require('dotenv')
const router = require('./routes/routes')
const socket = require('socket.io')
const jwt = require('jwt-then')

const jwtSecret = process.env.JWT_SECRET;
const app = express()

dotenv.config()
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connesso al DB')
    })
    .catch((error) =>{
        console.log(error)
    })

app.use(express.json())
app.use(cors())

app.get('/', (req,res) => {
    res.json('Ciao sei nella Root')
})

const server = app.listen(4000, ()=>{
    console.log('Server in ascolto sulla porta 4000')
})

const io = socket(server, {
    cors:{
        credentials: true,
        origin: process.env.CLIENT_URL
    }
})

app.use("/auth", router)
global.isOnline = new Map()
io.on('connection', (socket)=>{
    global.chat = socket;
    socket.on('add-friend',(userId)=>{
        isOnline.set(userId,socket.id)
    })

    socket.on('send-message',(data)=>{
        const sendSocket = isOnline.get(data.to)
        if(sendSocket) {
            socket.to(sendSocket).emit('received-message', data.message)
        }
    })
})








