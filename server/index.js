const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose').default
const cors = require('cors')
const dotenv = require('dotenv')
const router = require('./routes/routes')
const WebSocketServer = require('ws').Server

dotenv.config()
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connessione al DB')
    })
    .catch((error) =>{
        console.log(error)
    })
const jwtSecret = process.env.JWT_SECRET;
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.get('/', (req,res) => {
    res.json('Ciao sei nella Root')
})

app.use("/auth", router)

const server = app.listen(4000)

const wss = new WebSocketServer({server})
wss.on('connection',(connection, req) =>{

    function isOnline(){
        [...wss.clients].forEach(client => {
            client.send(JSON.stringify({
                online: [...wss.clients].map(user => (
                    {userId:c.userId, username:c.username}
                ))
            }))
        })
    }

    const cookies = req.headers.cookie
    if(cookies){
        const tokenCookie = cookies.split(';').find(str=> str.startsWith('token='))
        if(tokenCookie){
            const token = tokenCookie.split('=')[1]
            if(token){
                jwt.verify(token,jwtSecret,{},(error,userData) => {
                    if(error) throw error
                    const {userId, username} = userData
                    connection.userId = userId
                    connection.username = username
                })
            }
        }
    }

    connection.on('message', async(message) => {

    })




})




